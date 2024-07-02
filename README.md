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

I changed the viewer protocol to Redirect HTTP to HTTPS to ensure the secure transfer of data.
I also, modified the root object to “index.html,” which will be the default file served when accessing the website.

When the certificates have been issued to me in AWS Certificate Manager, I can edit the CloudFront distribution and add my domain name and SSL certificate (see the section AWS Certificate Manager below)

![4DFC0CA9-1950-4B75-B67C-ADB473334B1E_1_201_a](https://github.com/usmankhalid98/cloud-resume/assets/44751712/34e200bd-51f7-463d-adcc-46780237994f)

## Route 53

I have created a public hosted zone for my domain, usmankhalid.co.uk. This will generate some nameservers which I can use to point my domain name to.


![7CDE63F3-A1E7-42C6-A420-15E1B8A4854C_1_201_a](https://github.com/usmankhalid98/cloud-resume/assets/44751712/84e3d34a-0f65-4139-ad68-6d95a0b4c918)

## AWS Certificate Manager

I've updated my CloudFront distribution with my domain name and SSL certificate, I have created a record within the hosted zone I created earlier so that my domain, usmankhalid.co.uk, points to the CloudFront distribution.

I have requested a public certificate for the following domains I own:

<li>usmankhalid.co.uk</li>
<li>*.usmankhalid.co.uk (the wildcard * is used to allow all the subdomains)/li>

This will generate some SSL certificates which I will be using in my CloudFront distribution. As all my resources are in the London region (eu-west-2), I originally requested a certificate in that region but AWS requires you to have your certificates in N. Virginia (us-east-1) if you want to attach it to your CloudFront distribution. You won't be able to export the existing certificate but you will be fine to request a certificate in us-east-1 for the same domain name.
