import os
import requests

def download_images():
    # List of image URLs for Toyota 4runner Venture
    image_urls = [
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/72af304e40b94810b2b47bb48b28e821_ful.jpg",
        # Remaining URLs will be the full URLs from the first image source
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/83ce936957614c4b858d4ef24197b55f_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/86227499b23540d69ebeec3a5443c37f_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/59ae713510e84f54bc2bdf6180df0b07_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/e25f6c3c597a491a964cf6647fdfb6d7_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/3d6d921d742e4f86ade863a1b28c7067_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/11015cb553e843648c10bf36997cf843_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/13ced6ae81cf40b88a3ddd932126606d_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/bfc67cd241d34a44acc91c4dd0b4e76e_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/b1c6df8a3686496dabdecf97987dae49_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/5d784db70cdc44e7b59fc460e24a9547_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/3ffb83d206944b45ab1ff9cadf4508d3_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/LPP550/03105b257b3844689a2597112ba035d7_ful.jpg"
    ]
    
    # Create images directory if it doesn't exist
    os.makedirs("images", exist_ok=True)
    
    # Download each image
    for url in image_urls:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors
            
            # Extract filename from the last part of the URL
            filename = os.path.basename(url)
            filepath = os.path.join("images", filename)
            
            with open(filepath, "wb") as file:
                file.write(response.content)
            
            print(f"Downloaded: {filename}")
        
        except requests.exceptions.RequestException as e:
            print(f"Error downloading {url}: {e}")

if __name__ == "__main__":
    download_images()