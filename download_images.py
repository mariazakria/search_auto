import os
import requests

def download_images():
    # List of image URLs for Hyundai Santa Cruz SEL
    image_urls = [
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/c2f6052bb963433ab6d93ee3f84fa853_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/8cca48e10b834d1789111edaccb72a02_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/f00fad75a1414bd3b5595fa0706d145e_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/54964e88568d4192ba7d066d626a1290_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/58a04636ea5e4283a1e6a870f14b3680_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/5b9a685a3ee4412d9af7187a549101c5_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/4141dbce006045689195375fbcb9accf_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/de424c644fc24fd3bb91aca5c62b26b1_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/ccf008dd249d4676b5654b23eaf30261_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/c5afb8b93cbb42d2b8664df53ae4e36e_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/f6b380ee6f594599853def9ad644df69_ful.jpg",
        "https://images.salvagereseller.com/v1/AUTH_svc.pdoc00001/lpp/0224/7ad90e45de6248e69eea5fb57b2b031b_ful.jpg"
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