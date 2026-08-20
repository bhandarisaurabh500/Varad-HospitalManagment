import cv2
import sys
import os

image_path = sys.argv[1]
output_path = sys.argv[2]

if not os.path.exists(image_path):
    print(f"Error: File {image_path} not found.")
    sys.exit(1)

# Load the image
img = cv2.imread(image_path)
if img is None:
    print(f"Error: Could not read image {image_path}")
    sys.exit(1)

# Load the pre-trained face detection cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect faces
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

if len(faces) == 0:
    print("No faces detected.")
    sys.exit(1)

# Assume the largest face is the doctor
largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
x, y, w, h = largest_face

# Add padding
padding_x = int(w * 0.5)
padding_y = int(h * 0.8)

x1 = max(0, x - padding_x)
y1 = max(0, y - padding_y)
x2 = min(img.shape[1], x + w + padding_x)
y2 = min(img.shape[0], y + h + padding_y)

# Crop the face with padding
cropped = img[y1:y2, x1:x2]

# Save the cropped image
cv2.imwrite(output_path, cropped)
print(f"Face cropped and saved to {output_path}")
