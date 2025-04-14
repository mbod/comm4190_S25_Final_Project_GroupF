## COMM4190 (Spring 2005) Final Project

### Project Group _

----

**Final Project Proposal:** 

**Idea:** Build a RAG with restaurant data from University City.

**Users:**

	**Flow 1 \- Hungry Eater(s)**

- User needs food asap  
- User searches for place based on what they have’t had in a while  
- Goes to closest place

	  
	**Flow 2 \- New Relationship / Wanting to Impress**

- User explain relationship  
- Provides details about who they want to impress  
- Provides a budget  
- Makes reservation / plan

	**Flow 3 \- Group going out**

- Group is formed  
- User communicates vibe / occasion  
- User communicates budget  
- Makes reservation / plan

	  
		  
**Implementation:**  
**Phase 1 | Data Collection**

- Manual Collection via Yelp/Google Reviews (finite number of restaurants)  
- Format data (Google Sheets / Excel)

  **Phase 2 | RAG Setup via WatsonFlows**

  Relevant link: [https://developer.ibm.com/tutorials/awb-build-rag-application-watsonx-ai-flows-engine/](https://developer.ibm.com/tutorials/awb-build-rag-application-watsonx-ai-flows-engine/)

**Potential Challenges:**

- Poor quality based on available data  
- Thoughts on dining can be subjective  
- Individual Data Scraping  
- 

**Alternative Approaches:**  
Build a RAG with data from:

- Penn Student Handbook  
- Other Penn Agencies / Clubs  
- Data local to Philadelphia (Housing / Crime)

**GPTed User Scenarios:**  
**1\. The Hungry Eater – "I Need Food Now"**  
Scenario: Jordan, a busy college student, just finished a late-night study session and is starving. They want to grab something quick but don’t want to repeat meals they’ve had recently.

User Journey:

Jordan opens the app and selects “Find Food Fast.”

The system asks if they have any preferences or dietary restrictions. Jordan skips this step since they just want something different from their recent meals.

The RAG system retrieves their past dining history and suggests nearby places they haven’t visited recently.

Based on their location, the app sorts options by proximity and estimated wait time.

Jordan selects a restaurant and heads there immediately.

**2\. The Impression-Maker – "Planning a Special Date"**  
Scenario: Alex wants to take their new partner, Sam, on a dinner date to celebrate their one-month anniversary. They want a place that is romantic but within a reasonable budget.

User Journey:

Alex chooses “Impress Someone” in the app.

They provide details about their relationship (e.g., early dating stage, casual but meaningful).

The app asks about the preferred cuisine type, atmosphere (e.g., quiet and intimate vs. lively), and budget.

The RAG system analyzes restaurant reviews, ambiance descriptions, and price ranges to suggest ideal options.

Alex selects a restaurant and books a reservation through the app.

**3\. The Group Planner – "Coordinating a Night Out"**  
Scenario: Maya and her friends want to go out for dinner before a concert. They need a place that can accommodate six people, fits their budget, and has a fun vibe.

User Journey:

Maya selects “Plan for a Group” in the app.

She enters the number of people in the group and the occasion (e.g., pre-concert dinner).

The app prompts her to select a preferred cuisine or let the group vote.

It also asks for budget constraints and whether they need a place with reservations.

The RAG system finds restaurants that fit the criteria, sorts them by availability, and provides reservation options.

Maya books a spot and shares the details with her friends.

**4\. The Foodie Explorer – "Trying Something New"**  
Scenario: Chris, a self-proclaimed foodie, loves discovering hidden gems and highly rated but lesser-known spots. They want a unique dining experience in University City.

User Journey:

Chris selects “Find a Hidden Gem” in the app.

They set preferences for unique or highly rated but less-reviewed places.

The RAG system filters out overly popular restaurants and highlights places with strong but limited reviews.

The app provides a brief description of each place’s standout dishes or features.

Chris picks a restaurant and shares their experience afterward, contributing new data to the system.

**5\. The Budget-Conscious Diner – "Best Meal for the Best Price"**  
Scenario: Taylor, a college student on a tight budget, wants to find a good meal that is affordable but still tasty.

User Journey:

Taylor selects “Best Meal for My Budget.”

They enter their maximum budget per person.

The app asks if they’re looking for full meals, snacks, or happy hour deals.

The RAG system sorts restaurants by value, highlighting student discounts, specials, or highly rated cheap eats.

Taylor picks a place and enjoys a great meal without breaking the bank.

**Final Project Proposal**

**Idea:**  
Build a RAG system that provides personalized restaurant recommendations using data from University City. The system will use manually collected restaurant data from Yelp and Google Reviews to assist users in making informed dining decisions based on various contexts such as urgency, social setting, and budget. This tool will enhance the dining experience by providing real-time, context-aware suggestions tailored to individual user preferences. Whether a user is looking for a quick meal, planning a date, or organizing a group outing, the system will curate a list of suitable restaurants based on user input. With structured restaurant data and retrieval methods, the RAG system will make accurate, relevant, and aligned recommendations.

The key feature of this system is its ability to understand nuanced user preferences and/or constraints. For example, a user in a rush might prioritize proximity and speed of service, while a group planning an evening out might care more about ambiance and availability of group seating. By leveraging NLPs and contextual retrieval, the system will adapt to these varying requirements, offering an efficient experience rather than scrolling through Yelp and Google Reviews for hours. This project aims to bridge the gap between AI driven search and personalized recommendations like those of Yelp and Google Reviews, providing an innovative tool that enhances the restaurant decision making process for users in University City.

**User Scenarios:**

**Flow 1 \- Hungry Eater(s)**

* User needs food immediately.  
* Searches for restaurants based on cuisine they haven't had in a while.  
* Gets suggestions and navigates to the closest available option.

**Flow 2 \- New Relationship / Wanting to Impress**

* User explains the nature of the relationship (e.g., date, boss, in-laws).  
* Provides details about the person they want to impress.  
* Sets a budget.  
* Receives tailored restaurant suggestions and makes a reservation or plan.

**Flow 3 \- Group Going Out**

* A group is formed, and preferences are gathered.  
* Users specify the vibe (e.g., casual, fancy, lively) and occasion (e.g., birthday, celebration).  
* Users provide a budget range.  
* The system recommends places that fit the criteria, and a reservation is made.

**Implementation Phases:**

**Phase 1 | Data Collection**

* Manually collect restaurant data from Yelp and Google Reviews  
* Store data in a structured format (Google Sheets/Excel)  
* Label key attributes such as cuisine type, pricing, ambiance, and user sentiment

**Phase 2 | RAG Setup via Watsonx Flows**

* Set up a RAG model  
* Configure the retrieval pipeline to fetch relevant restaurant recommendations based on user queries  
* Implement ranking logic to prioritize recommendations based on context (e.g., urgency, budget, preferences)

**Potential Challenges:**

* Data quality may vary based on available reviews  
* Dining preferences are highly subjective  
* Ethical considerations regarding web scraping and data usage

**Alternative Approaches:**

* Build a RAG system with data from the Penn Student Handbook for student-specific services.  
* Aggregate information from Penn agencies or clubs to offer recommendations beyond dining (e.g., social events, activities).  
* Expand the model to include local Philadelphia data such as housing, crime reports, or community resources.

**Prompting Experiments & Development:**

* Experiment with different prompting strategies for Watsonx to refine query responses (e.g., “What’s a quiet place for a study date under $30?” vs. “Suggest a fancy Italian restaurant”).  
* Fine-tune retrieval mechanisms to balance relevancy and diversity in recommendations.  
* Test user interactions with different user flows to refine response accuracy and user satisfaction.

This project aims to provide an efficient tool for University City restaurant goers, making the decision making process more enjoyable and more efficient with AI-driven recommendations.




