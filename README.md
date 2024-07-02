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
<li>*.usmankhalid.co.uk (the wildcard * is used to allow all the subdomains)</li>


This will generate some SSL certificates which I will be using in my CloudFront distribution. As all my resources are in the London region (eu-west-2), I originally requested a certificate in that region but AWS requires you to have your certificates in N. Virginia (us-east-1) if you want to attach it to your CloudFront distribution. You won't be able to export the existing certificate but you will be fine to request a certificate in us-east-1 for the same domain name.

## DynamoDB and Lambda 

In the next phase of this project, I created a view counter for my website using Lambda API and DynamoDB as the database, enabling the website to display the number of visitors it had received. Rather than directly accessing the database from my website, I invoked a Lambda function to retrieve the values from DynamoDB.

I navigated to the “Tables” section in DynamoDB to create a table for storing the view counter data. I set the primary key as “id” and left other settings as default, optionally adding a tag.

After creating the table, I went to the “Explore items” section where there were currently no items. I then proceeded to create a new item with an attribute named “Views” having a value of “1” and the type set as “Number”.

I now had a table created with an item specifically designed to store the view count.

![7EF04F81-2083-4984-8672-AB4FE2708397](https://github.com/usmankhalid98/cloud-resume/assets/44751712/b003ea79-fa52-45df-8734-1ae54e2cc8b0)


I created a Lambda function that interacted with the DynamoDB table to increment the view counter, and configured the necessary permissions for the Lambda function to access DynamoDB.

I navigated to AWS Lambda and clicked on “Create function.” I provided a name for my function and chose Python as the runtime. I opted to create a new execution role with basic Lambda permissions.

In the advanced settings, I also enabled the Function URL to allow interaction with the function through HTTP requests and set the Authorization type as “NONE” to allow unrestricted access. Additionally, I enabled CORS (Cross-Origin Resource Sharing) to whitelist my URL as the only allowed origin for fetching data from this API.

Next, I proceeded to add the required permissions for the Lambda function to retrieve and update the viewer count in DynamoDB. Navigating to the “Configuration” tab of my function, I accessed the permission sidebar and clicked on the execution role. This action redirected me to IAM, where I included the “AmazonDynamoDBFullAccess” permission policy in the execution role, providing both Read and Write access.

While in the configuration menu, I made sure to configure the CORS “Allow-Origin” setting to restrict access to the function URL only from my domain name (usmankhalid.co.uk)

After creating the function and granting the necessary permissions, I added the required code to fetch the item from the DynamoDB table.

![997972AD-FE75-422E-B42F-11D05FD7AE11](https://github.com/usmankhalid98/cloud-resume/assets/44751712/855ea181-29f2-4e38-a87a-f9c0a0b25aab)

## Implementing the View Counter Feature in Website Code

In this section, I updated the website code to incorporate the view count obtained from the API and display it on the website.

I created an index.js file in the root folder of my website and added the following JavaScript code to it.

![B2D5310E-C716-4BBB-AA52-E3C526BA1BDB](https://github.com/usmankhalid98/cloud-resume/assets/44751712/ebf9e852-b1ae-4e67-9028-c1ce2830e217)

Now that I had created the JavaScript code, I referenced it within our index.html file. I created a script tag just before closing the body, which improved website loading performance by allowing the HTML content to render first before executing the JavaScript code. I incorporate the view counter on my webpage using a div class.

## Implementing Source Control and CI/CD with GitHub Actions

In this section, I added my website code to a GitHub repository and set up GitHub Actions to automate the process of pushing changes to my S3 bucket whenever I committed changes to my website code. This CI/CD pipeline automatically updated my S3 bucket and reflected the changes on my website, ensuring a seamless and efficient development workflow.

To create a seamless experience for updating my website code and ensure that changes made on my local machine were reflected on our live website, I set up a CI/CD process that automatically uploaded files to S3 and applied updates dynamically when changes were pushed to GitHub.

I navigated back to my website code and created a new folder named “.github/workflows” within the root folder of my website. Inside this folder, I created a YAML file named “ci-cd.yml” to hold the GitHub Action configuration. I then added the following code snippet to the “ci-cd.yml” file:

![083CD493-FE66-416C-A6B1-62B9B8E225E1](https://github.com/usmankhalid98/cloud-resume/assets/44751712/876e2d35-667d-41fa-b47d-0c248610b53d)

