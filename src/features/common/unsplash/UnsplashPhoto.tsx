export type UnsplashUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

export type UnsplashLinks = {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export type UnsplashUserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export type UnsplashUserProfileImage = {
  small: string;
  medium: string;
  large: string;
}

export type UnsplashUserSocial = {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

export type UnsplashUser = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string | null;
  location: string;
  links: UnsplashUserLinks;
  profile_image: UnsplashUserProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: UnsplashUserSocial;
};

export type UnsplashExif = {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: string | null;
}

export type UnsplashLocation = {
  name: string;
  city: string | null;
  country: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

export type UnsplashTagCoverPhotoUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export type UnsplashTagCoverPhotoLinks = {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export type UnsplashTagCoverPhoto = {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: UnsplashTagCoverPhotoUrls;
  links: UnsplashTagCoverPhotoLinks;
  likes: number;
  liked_by_user: boolean;
  topic_submissions: {
    textures_patterns: {
      status: string;
      approved_on: string;
    };
  };
  premium: boolean;
  plus: boolean;
  user: UnsplashUser
}

export type UnsplashTagSource =  {
  ancestry: {
    type: {
      slug: string;
      pretty_slug: string;
    };
    category: {
      slug: string;
      pretty_slug: string;
    };
    subcategory: {
      slug: string;
      pretty_slug: string;
    };
  };
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: UnsplashTagCoverPhoto;
};

export type UnsplashTag = {
  type: string;
  title: string;
  source?: UnsplashTagSource;
}

export type UnsplashPhoto = {
    id: string;
    slug: string;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string;
    urls: UnsplashUrls,
    links: UnsplashLinks;
    likes: number;
    liked_by_user: boolean;
    user: UnsplashUser,
    exif: UnsplashExif;
    location: UnsplashLocation;
    meta: {
      index: boolean;
    };
    public_domain: boolean;
    tags: UnsplashTag[];
    tags_preview: {
      type: string;
      title: string;
    }[];
    views: number;
    downloads: number;
  };