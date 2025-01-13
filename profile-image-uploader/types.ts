export interface ProfileSelectorPropsTypes {
  profileImageUrl: string | null;
  onChangeImage: (img: string) => void;
  deleteUrl?: string;
  uploadUrl?: string;
  type?: "profile" | "image";
}
