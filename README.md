# Cloud Resume Challenge (AWS)

## Overview

The Cloud Resume Challenge is a project designed to showcase my skills in cloud technologies. This project involves creating a serverless website that tracks and displays the number of visits using AWS services. Below is the Architectural Diagram of my cloud resume challenge. 

![C1780D10-A310-41AC-96DA-EEE96DC719ED_1_201_a](https://github.com/usmankhalid98/cloud-resume/assets/44751712/23154eb3-bb45-4343-a469-3b4559b63f3c)

## Creating the Site with HTML and CSS

The front end of the site was built using HTML and CSS. The goal was to create a responsive and user-friendly interface. I have used a website template which consists of HTML & CSS. I've opted to do this rather than creating a website from scratch as this project's main aim is to gain some solid experience using AWS and related DevOps tooling.

## S3 (Storing my website files in S3)

To get started, I use Amazon S3 (Simple Storage Service) to store my website's HTML, CSS, and JavaScript files. S3 provides highly durable and scalable object storage, making it perfect for hosting static content. By creating an S3 bucket, I can securely store and manage my website’s files. I begin by creating a new bucket, selecting a unique name, and choose the eu-west-2 (London) which is the region that best fits my requirements.

I make sure to keep ACLs disabled and enable the "Block all public access" setting to prevent any unauthorized public access to the contents stored in the bucket.

## Setting up CloudFront

While S3 provided reliable storage, I enhanced the performance and global reach of my website by leveraging CloudFront, AWS's Content Delivery Network (CDN). CloudFront cached and distributed my website's content across a network of edge locations worldwide, reducing latency and improving the user experience.

When creating the distribution, I made sure to select the S3 bucket as the Origin Domain and chose "Origin access control settings" under Origin Access. OAC (Origin Access Control) in CloudFront was a feature that restricted access to my origin server, ensuring that only specified CloudFront distributions could access it. After creating the distribution, I saw an option to copy the S3 bucket policy that allowed only CloudFront to communicate with the S3 bucket.

When the certificates have been issued to me in AWS Certificate Manager, I can edit the CloudFront distribution and add in my domain name and SSL certificate (see the section AWS Certificate Manager below)

![4DFC0CA9-1950-4B75-B67C-ADB473334B1E_1_201_a](https://github.com/usmankhalid98/cloud-resume/assets/44751712/34e200bd-51f7-463d-adcc-46780237994f)
