import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.init";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaUser, FaEnvelope, FaCamera, FaSave, FaArrowLeft, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router";

// Helper function to upload image to imgbb
const uploadImageToImgbb = async (file) => {
    const apiKey = import.meta.env.VITE_image_upload_key;
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    if (data.success) {
        return data.data.url;
    } else {
        throw new Error("Image upload failed");
    }
};

const UpdateProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(user?.photoURL || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentDisplayName, setCurrentDisplayName] = useState(user?.displayName || "");
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            displayName: user?.displayName || "",
            email: user?.email || "",
            photoURL: user?.photoURL || ""
        }
    });

    // Handle image URL change
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setValue("photoURL", url);
        setImagePreview(url);
        setSelectedFile(null); // Clear file selection when URL is entered
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Clean up previous preview URL
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            
            setSelectedFile(file);
            setValue("photoURL", ""); // Clear URL when file is selected
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    // Update form when user data changes from Firebase Auth
    useEffect(() => {
        if (user) {
            reset({
                displayName: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || ""
            });
            setCurrentDisplayName(user.displayName || "");
            // Update image preview if no file is selected
            if (!selectedFile) {
                setImagePreview(user.photoURL || "");
            }
        }
    }, [user, reset, selectedFile]);

    // Cleanup function for preview URLs
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Upload image and get URL
    const handleImageUpload = async () => {
        if (!selectedFile) {
            return null;
        }
        
        setUploadingImage(true);
        try {
            const uploadedUrl = await uploadImageToImgbb(selectedFile);
            
            setValue("photoURL", uploadedUrl);
            setImagePreview(uploadedUrl);
            toast.success(t('profile.imageUploadSuccess') || "Image uploaded successfully!");
            return uploadedUrl;
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error(t('profile.imageUploadError') || "Failed to upload image. Please try again.");
            throw error;
        } finally {
            setUploadingImage(false);
        }
    };



    const onSubmit = async (data) => {
        // Prevent double submission
        if (isSubmitting || loading || uploadingImage) {
            return;
        }

        setIsSubmitting(true);
        setLoading(true);
        
        try {
            let photoURL = data.photoURL || "";
            
            // If a file is selected, upload it first
            if (selectedFile) {
                try {
                    const uploadedUrl = await handleImageUpload();
                    if (uploadedUrl) {
                        photoURL = uploadedUrl;
                    }
                } catch (error) {
                    console.error("Image upload failed:", error);
                    return; // Don't proceed if image upload fails
                }
            }

            const updateData = {
                displayName: data.displayName?.trim() || user?.displayName || "",
                photoURL: photoURL?.trim() || ""
            };
            
            // Validate data before update
            if (!updateData.displayName) {
                toast.error(t('profile.displayNameRequired') || "Display name is required");
                return;
            }
            
            // Update Firebase Auth profile
            await updateUserProfile(updateData);

            // Update local state immediately for instant UI feedback
            setCurrentDisplayName(updateData.displayName);

            // Clear selected file after successful update
            setSelectedFile(null);

            // Force refresh the form with new data after a delay to allow Firebase to sync
            setTimeout(() => {
                if (auth.currentUser) {
                    reset({
                        displayName: auth.currentUser.displayName || "",
                        email: auth.currentUser.email || "",
                        photoURL: auth.currentUser.photoURL || ""
                    });
                    setCurrentDisplayName(auth.currentUser.displayName || "");
                    // Update image preview to show the updated profile picture
                    setImagePreview(auth.currentUser.photoURL || "");
                }
            }, 500);

            toast.success(t('profile.updateSuccess') || "Profile updated successfully!");
            
            // Stay on the profile page - no navigation
            
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(t('profile.updateError') || "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('profile.updateProfile') || 'Update Profile'}
                    </h2>
                    <p className="text-gray-600">
                        {t('profile.updateDescription') || 'Update your account information'}
                    </p>
                </div>

                {/* Profile Image Preview */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={imagePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentDisplayName || user?.email || "U")}&background=396961&color=fff&rounded=true&size=128`}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-4 border-[#396961]"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentDisplayName || user?.email || "U")}&background=396961&color=fff&rounded=true&size=128`;
                            }}
                        />
                        <div className="absolute bottom-0 right-0 p-1 bg-[#396961] rounded-full">
                            <FaCamera className="text-white" size={12} />
                        </div>
                        {uploadingImage && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Update Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Display Name */}
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUser className="inline mr-2" />
                            {t('profile.displayName') || 'Display Name'}
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            {...register("displayName", {
                                required: t('profile.displayNameRequired') || "Display name is required",
                                minLength: {
                                    value: 2,
                                    message: t('profile.displayNameMinLength') || "Display name must be at least 2 characters"
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#396961] focus:border-transparent"
                            placeholder={t('profile.enterDisplayName') || 'Enter your display name'}
                        />
                        {errors.displayName && (
                            <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
                        )}
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="inline mr-2" />
                            {t('profile.email') || 'Email'}
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            placeholder={t('profile.emailReadonly') || 'Email cannot be changed'}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            {t('profile.emailNote') || 'Email address cannot be modified'}
                        </p>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaCamera className="inline mr-2" />
                            {t('profile.profilePicture') || 'Profile Picture'}
                        </label>
                        
                        {/* File Upload */}
                        <div className="mb-4">
                            <label htmlFor="photoFile" className="block text-xs font-medium text-gray-600 mb-1">
                                {t('profile.uploadImage') || 'Upload Image File'}
                            </label>
                            <input
                                type="file"
                                id="photoFile"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#396961] focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-[#396961] file:text-white hover:file:bg-[#2e5a52]"
                            />
                            {selectedFile && (
                                <p className="mt-1 text-xs text-green-600">
                                    {t('profile.fileSelected') || 'File selected:'} {selectedFile.name}
                                </p>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="px-3 text-xs text-gray-500">{t('profile.or') || 'OR'}</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* URL Input */}
                        <div>
                            <label htmlFor="photoURL" className="block text-xs font-medium text-gray-600 mb-1">
                                {t('profile.imageUrl') || 'Image URL'}
                            </label>
                            <input
                                type="url"
                                id="photoURL"
                                {...register("photoURL", {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                        message: t('profile.invalidUrl') || "Please enter a valid URL"
                                    }
                                })}
                                onChange={handleImageUrlChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#396961] focus:border-transparent"
                                placeholder={t('profile.enterImageUrl') || 'Enter image URL'}
                                disabled={selectedFile !== null}
                            />
                            {errors.photoURL && (
                                <p className="mt-1 text-sm text-red-600">{errors.photoURL.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                {t('profile.imageNote') || 'Upload a file or enter a direct link to your profile image'}
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || uploadingImage || isSubmitting}
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-[#396961] hover:bg-[#2e5a52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#396961] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading || uploadingImage || isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                {uploadingImage 
                                    ? (t('profile.uploadingImage') || 'Uploading Image...')
                                    : (t('profile.updating') || 'Updating...')
                                }
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" />
                                {t('profile.updateProfile') || 'Update Profile'}
                            </>
                        )}
                    </button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            {t('profile.securityNote') || 'Your account security is important to us. Contact support if you need help.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
