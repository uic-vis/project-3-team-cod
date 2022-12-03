## **SPEED CAMERA VIOLATIONS**
### **Link for Project - 3 :**  https://indureddypati.github.io/ChicagoSpeedViolations.github.io/

Team COD
  
Shiva Praveen Donga (UIN: 676463688)
  
Indu Reddy Pati (UIN: 657783668)


## 1. **Introduction:**
  
In this project, we used a Speed Camera Violation dataset to visualize the attributes of interest. The main goal of this project is to explore data visualization. We used Pandas, GeoPandas, Matplotlib and Jupyter to import, transform, visualize and analyze a dataset. Before visualizing the dataset, we have done data preprocessing and data cleaning. We comprehensively explored the dataset using different plotting techniques. We explored every insight possible in the dataset using multiple attributes.

## 2. **Data Description:**

**2.1. Dataset Overview:**

The dataset is obtained from the [Chicago Data portal](https://data.cityofchicago.org/Transportation/Speed-Camera-Violations/hhkd-xvj4). The camera and radar system has recorded the violations that have been reported. The data that we considered is from July 1st 2014 to August 31st 2022. This dataset has 9 attributes (Columns) and 309,320 data rows. The attributes are: ADDRESS, CAMERA\_ID, VIOLATION\_DATE, VIOLATIONS, X\_COORDINATE, Y\_COORDINATE, LATITUDE, LONGITUDE and LOCATION.

![alt text](https://github.com/uic-vis/project-1-team-cod/blob/main/images/Initial_DF.png?raw=true)

**2.2. Data Cleaning:**

The dataset consists of null values so we tried to remove NAN or null values. There are a total 309,320 data rows of which 11,782 rows have null values. So, we used .dropna() to remove (or drop) all the null values. After dropping all the null values, the dataset has 297,538 rows in total.

<img width="1147" alt="Screen Shot 2022-11-04 at 10 39 50 PM" src="https://user-images.githubusercontent.com/53014597/200099292-e4514be6-6e00-4be5-947f-835b0f9060a9.png">

**2.3. Extraction:**

We extracted the required extra columns from already present columns Dataset - weekday, year, month, day from VIOLATION\_DATE.

<img width="1157" alt="Screen Shot 2022-11-04 at 10 37 04 PM" src="https://user-images.githubusercontent.com/53014597/200099218-f6cc5b86-604f-443c-a555-575cd576d933.png">

**2.4. Data Aggregation:**

Aggregate the Speed Violations Data as required such as AddressWise, MonthWise, Yearwise.
<img width="1074" alt="Screen Shot 2022-11-04 at 10 44 32 PM" src="https://user-images.githubusercontent.com/53014597/200099409-3e2a7acf-0ca4-4140-986f-3369566d304b.png">

## **3.Questions and Observations:**

**3.1. Question - 1:** 

What is the trend in Speed Violations across different months from 2014 - 2022?

We plotted the  bar chart with comparison on increase or decrease with other bars(Months) . In this we have Months on x-axis and Violations on y-axis. And we have a number of violations on each bar.

<img width="1177" alt="Screen Shot 2022-11-05 at 3 49 54 AM" src="https://user-images.githubusercontent.com/53014597/200111741-b4a7910c-42c9-4709-b8fa-6d9604035721.png">

- For easy to interpret and comparison of one month with other months. We made the Bar Chart interactive, the percentage of decrease or increase is shown when we hover over a particular month bar.

**Observations for Question - 1:**
- When we compared the least violation month february with highest violation month(July) there is an increase of +94.04%.
- Most violations and least Violations: July - 1159159,   Feb - 596287 respectively.
- The months of a summer have more violations than the winter season.
- Reasons for more summer violations could be:  
    People being on trips for summer vacation and People prefer public transport in winter than own vehicle and the other reason could be Brake Lockup due to Cold Weather.
    
**3.2.Questions - 2:** 

What is the trend in Speed Violations across Weekdays from 2014 - 2022?

We created a Linked View for Brushable Scatter Chart and Bar Chart. Scatter plot has the x and y coordinates from the data set and Bar plot has the weekdays which we extracted from given date of violation  data from the dataset.

<img width="1068" alt="Screen Shot 2022-11-05 at 4 03 31 AM" src="https://user-images.githubusercontent.com/53014597/200112162-55bc6f94-1ba8-412d-b18a-093b96740ebb.png">

- We created a Brush on Scatter Chart to Update the Bar Chart when we Brush on particular x and y coordinate on scatter plot we can see updated weekdays number of violations on bar chart. This helps user to easily interact and interpret the Number of violations for weekdays on x and y coordinates of Chicago.

**Observations for Question - 2:**
- Overall Friday has most number of violations in any particular area.
- Weekends have less violations when compared to weekdays.
- Reasons for Less violations on Weekends could be:  
    People being on trips for weekends to different cities or resting at home (Not in rush for not being late to work).
- From question 2 we saw Irving park has more violations when we brush that exact same irving park coordinates in this scatter, Saturday has most violations.

**3.3.Questions - 3:** 


What is the Trend in Speed Violations over the Years (2015 - 2021)? Did they Increase(↑) or Decrease(↓)?

We have created two Area Charts when we  Double Click on the Area Chart at Top to Zoom Or Brush the Area Chart at Bottom to Zoom in; the Area Chart at Top is Updated.

<img width="1009" alt="Screen Shot 2022-12-02 at 6 48 48 PM" src="https://user-images.githubusercontent.com/53014597/205414055-9479ba93-ec65-4392-99bd-badd07402422.png">

When brush a particular area in the bottom area chart the other area chart updats with months and even dates. We can extend the bottom chart area through brusing and the above area chart updates accordingly.

**Observations for Question - 3:**
- Over the years 2015 - 2020 there is slight decrease in the violations.
-  Then, there is a peak increase in the year 2021.
- Reason, could be people preferring to use there own vechiles to avoid the public crowd due to Pandemic.

**Spatial View:** 

Trend in Speed Violations across Locations (2015 - 2021)

We created Linked Map and Bar Chart Shows the Trend in Speed Violations Across Different Locations Over the Years. The Map Shows Cluster with Number of Locations. The Bar Chart Shows the Chicago Trend Over the Years at Start, but When Zommed in on Clusters and Selected a Locations Shows that Particular Locations Trend.

<img width="1440" alt="Screen Shot 2022-12-02 at 7 12 57 PM" src="https://user-images.githubusercontent.com/53014597/205415288-85abf3a7-c70a-4127-ba0c-9e6b6d32ff4d.png">

Click on Clusters to Zoom for Location Pin. Then, Hover Over for Total Name of the Location and Total Number of Violations and Click on Pin to See Trend Over Years at Location. And Hover Over Bar for Total Number of Violations in that Year for that Location
