## Documentation for Chart Analysis:

## Features:

- Loading screen during Fetching the required data
- Fetching data (from the given json file)
- Set the options of Countries/ Camps/ Schools after fetching the data
- On select values from all the 3 dropdown lists, filter the data and pass it to the chart and the lessons list
- Display lessons list (count per school) each by specific color
- onclick any lesson from the list, toggle it show/hide from chart & change its color in the list
- onClick any point on the chart, redirect to another page with the details of this point
- Cover most of the component by unit testing
- Using of typescript to improve maintainability
- Support localization & styles for both (Arabic & english)
- Toggle btn to switch the theme to light or dark
- Any configuration or default values is collapsible in config files

## Used Libraries:

| Requirement          | Library                                                    |
| -------------------- | ---------------------------------------------------------- |
| State Management     | redux                                                      |
| unit testing         | testing library & redux-moke-store                         |
| routing              | react-router-dom                                           |
| Chart                | Chart.js & react-chartjs-2                                 |
| localization         | i18next & i18next-browser-languagedetector & react-i18next |
| UI common components | ant design                                                 |
| format the code      | eslint & prettier                                          |

## Component structure:

    please check the attached draw.io file

## Store structure:

| entity               | description                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| items                | object of {id:{data}} , (saving data as object {id:item} to be easier in accessing/adding/updating/deleting for further requirements)   |
| isLoaded             | flag to know data is loaded or not to display loading screen or the required components .. its default value is set from lessons.config |
| countryFilteredValue | selected of countries DDL (to save filtering criteria if we change the view)                                                            |
| campFilteredValue    | selected of camp DDL (to save filtering criteria if we change the view)                                                                 |
| schoolFilteredValue  | selected of school DDL (to save filtering criteria if we change the view)                                                               |
|                      |

    - So now we have only single source of truth for our data
    - any other calculation is done through the selectors. for example: calculation of the lookup of countries/camps/schools from our data to be rendered in their dropDownLists

## Note:

    - It wasn't clear that the dropdown lists could have empty values or default values .. so for now I filter the data only if we have selected values in the whole 3 dropDownLists

    - I found that Chart.js has its own legend that can be used but actually I was running out of time to re-check this
