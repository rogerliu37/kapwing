"""
Handles GIF making
"""
from flask import Blueprint, request, jsonify
import ssl
from urllib.request import urlretrieve
from upload import upload_file
from PIL import Image
import tempfile
import shutil
import datetime

# prevent any ssl issues
ssl._create_default_https_context = ssl._create_unverified_context

# flask object
Gif = Blueprint('gif', __name__)

@Gif.route("/api/gif", methods=["POST"])
def make_gif():
  req_data = request.get_json()
  urls = req_data['urls']
  pictureInterval = req_data['pictureInterval']

  # creates temporary directory and list to store the copied images
  dirpath = tempfile.mkdtemp()
  original_images = []

  # iterates through urls and saves the image to orginal_images
  original_images = []
  for url in urls:
    # gets the filename and extension from url
    file_name = url.rsplit('/', 1)[-1]
    # create image filename 
    original_image = dirpath + file_name
    original_images.append(original_image)
    # downloads the user uploaded image to the temporary image file name
    urlretrieve(url, original_image)
  
  # loops through images and creates image objects to be used for the GIF
  images = []
  for file_name in original_images:
    image = Image.open(file_name)
    # resizes to keep images consistent
    image = image.resize((200, 200))
    images.append(image)
  
  # stores the Datetime into the URL to make sure each GIF is unique
  time = "".join(filter(str.isdigit, str(datetime.datetime.now())))

  result_file_path = dirpath + '/' + time + 'result.gif'

  # saves the images into a GIF 
  images[0].save(fp=result_file_path, format="GIF", append_images=images[1:],
           save_all=True, duration=pictureInterval, loop=0)

  # uploaded processed image to Amazon S3
  url = upload_file(result_file_path)

  # remove the temp directory / files
  shutil.rmtree(dirpath)

  # return the uploaded image url back to client
  return jsonify({'result': url})