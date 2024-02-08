import { test, expect } from "@playwright/test";
const { getResponse } = require("../utils/apiServices")
import { allure } from "allure-playwright";
const apiData=require("../testData/apiTest.data.json")
require("dotenv").config();
const Ajv = require("ajv");

test.describe("POC - Validating API", () => {
  test("Api for obtaining current weather report of a location "+apiData.current_weather.location, async ({ request }) => {
    let querParam="?";
    let weatherApiQuerys=apiData.current_weather.queryParams;
    for (let x in weatherApiQuerys) {
        querParam=querParam+x+"="+weatherApiQuerys[x]+"&";
      }
      console.log(process.env.api_Baseurl+apiData.current_weather.endPoint+querParam);
    const response = await getResponse(request,process.env.api_Baseurl+apiData.current_weather.endPoint+querParam);
   
      expect(response.ok()).toBe(true);

    const result = await response.json();
   
        expect(result.location.name).toBe(apiData.current_weather.location);

   
  });
  test("Api for obtaining  weather forcast report of a location  "+apiData.weather_forecast.location, async ({ request }) => {
    let querParam="?";
    let forcastApiQuerys=apiData.weather_forecast.queryParams;
    for (let x in forcastApiQuerys) {
        querParam=querParam+x+"="+forcastApiQuerys[x]+"&";
      }
    const response = await getResponse(request,process.env.api_Baseurl+apiData.weather_forecast.endPoint+querParam);
      expect(response.ok()).toBe(true);
    const result = await response.json();
    expect(result.location.name).toBe(apiData.weather_forecast.location);
  });
})