# Recipe Finder 

## Technologies used

- Express
- NodeJS
- REST APIs

## Concepts covered

- Router requests
- Req queries and parameters
- HATEOAS

### Project Summary & Implementation 

This is a recipe finder Express application where a user can search for a recipe "from a limited dataset"
from 4 categories: **Breakfast**, **Lunch**, **Dinner**, and **Desserts**. From there a user can select a recipe of their choosing to view. Upon clicking on the recipe the user will be shown the name of the recipe, the ingredients and the instructions the user would take to make the product. The user is also given the option to download the \[recipe\].txt file. The user can also be given the option to search recipes by ingredient **"category?ingredient= "**. Though this method is not perfect due cases where a user can search for non ingredient words like "of" which could pull ingredients that contain **"a pinch of salt"**

**HATEOAS links are displayed with a __USAGE__ link in the main page**

**Try ingredient queries like lemon or ice to quickly see response**