-- Table for storing data when column2Value === 1
create schema request_management_system;
 drop TABLE your_table_name_1;
 drop TABLE your_table_name_2;
 drop TABLE your_table_name_3;
 drop TABLE your_table_name_4;
 drop TABLE your_table_name_5;
-- Table for storing data when column2Value === 1
CREATE TABLE new_license (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255),
    LicenceType VARCHAR(255),
    IsOffice VARCHAR(255),
    OfficeName VARCHAR(255),
    OfficeServiceNumber VARCHAR(255),
    RequestDate VARCHAR(255),
    Activities VARCHAR(255)
);

-- Table for storing data when column2Value === 2
CREATE TABLE account_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255),
    RequesterName VARCHAR(255),
    ApplicantName VARCHAR(255),
    UserName VARCHAR(255),
    ContactEmail VARCHAR(255),
    Permissions VARCHAR(255)
);

-- Table for storing data when column2Value === 3
CREATE TABLE inspection_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255),
    InspectionDate VARCHAR(255),
    InspectionTime VARCHAR(255),
    InspectionType VARCHAR(255)
);

-- Table for storing data when column2Value === 4
CREATE TABLE add_new_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255),
    LicenceID VARCHAR(255),
    Activities VARCHAR(255)
);

-- Table for storing data when column2Value === 5
CREATE TABLE stamp_license_letter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CompanyName VARCHAR(255),
    LicenceID VARCHAR(255),
    RequestDate VARCHAR(255)
);
