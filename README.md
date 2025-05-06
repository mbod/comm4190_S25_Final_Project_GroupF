## COMM4190 (Spring 2005) Final Project

### Project Group _

----

**Final Project Proposal:** 

**Idea:**  
Build a RAG system that provides personalized restaurant recommendations using data from University City. The system will use manually collected restaurant data from Yelp and Google Reviews to assist users in making informed dining decisions based on various contexts such as urgency, social setting, and budget. This tool will enhance the dining experience by providing real-time, context-aware suggestions tailored to individual user preferences. Whether a user is looking for a quick meal, planning a date, or organizing a group outing, the system will curate a list of suitable restaurants based on user input. With structured restaurant data and retrieval methods, the RAG system will make accurate, relevant, and aligned recommendations.

The key feature of this system is its ability to understand nuanced user preferences and/or constraints. For example, a user in a rush might prioritize proximity and speed of service, while a group planning an evening out might care more about ambiance and availability of group seating. By leveraging NLPs and contextual retrieval, the system will adapt to these varying requirements, offering an efficient experience rather than scrolling through Yelp and Google Reviews for hours. This project aims to bridge the gap between AI driven search and personalized recommendations like those of Yelp and Google Reviews, providing an innovative tool that enhances the restaurant decision making process for users in University City.

**Project Summary:** 
For our final project, we’re building a restaurant recommendation tool that helps people quickly and easily decide where to eat in University City. The app uses RAG, to suggest restaurants based on different situations like being in a rush, planning a date, or organizing a group dinner.

We’re collecting data ourselves and using LLMs (GPT 4o) to assist us in the process. structuring it in a clean format, and then connecting it to a system powered by IBM Watsonx. The end result is a tool that doesn’t just throw a list of restaurants at users but instead understands what they’re looking for and gives recommendations that actually make sense for their situation.

**Project Goals:**
- Create a system that feels helpful without feeling overwhelming
- Make dining decisions faster and with more confidence
- Give personalized suggestions based on mood, budget, group size, or vibe
- Show how AI tools like Watsonx can be used in everyday decision making
- See how different prompts change the responses we get from the system

**Users Scenarios:**

We’ve created five user types that represent the kinds of situations UPenn students often face when trying to find somewhere to eat. Each one has a different goal...

	**Flow 1 \- The Hungry Eater: I need food now!**

- User needs food asap  
- User searches for place based on what they have’t had in a while  
- User goes to closest place

Example:
- Jordan just finished a long night of studying and needs food ASAP
- Jordan opens the app and searches Food I can get fast
- The system checks Jordan's location and recent dining history
- It shows nearby spots that are open and not too busy
	  
	**Flow 2 \- The Impression Maker: I hope they like it!**

- User explains relationship  
- User provides details about who they want to impress  
- user provides a budget  
- User makes reservation / plan

Example:
- Alex is planning a one month anniversary dinner and wants it to be memorable but not too expensive
- Alex enters a few details like the relationship type, vibe, and budget
- The system looks at reviews and ambiance notes
- It recommends places that are romantic but still within budget

	**Flow 3 \- The Group Planner: Let's go out guys!**

- Group is formed  
- User communicates vibe / occasion  
- User communicates budget  
- User makes reservation / plan

Example:
- Maya and her friends want dinner before a concert
- Maya inputs the group size, occasion, cuisine and vibe
- The app finds places with group seating and availability that fits her criteria

	**Flow 4 \- The Foodie Explorer Planner: I want to go somewhere new!**

- User is sick of their usual spots, want to try something new, user communicates this  
- User communicates budget  
- User makes reservation / plan

Example:
- Chris loves finding cool, hidden food spots
- Chris tells the Rag he wants something unique and not too popular
- The system finds places with fewer crowds with good reviews

	**Flow 5 \- The Budget Conscious Diner: I want to go somewhere cheap!**

- User is tught on money but wants/has to eat out, user communicates this  
- User communicates budget  
- User makes reservation / plan

Example:
- Taylor is trying to stick to a budget but still wants good food
- Taylor sets a price limit and communicates a meal type
- The system finds affordable spots with good ratings, it also shows places with student discounts or deals
            
**GPTed User Journeys:**  

**1\. The Hungry Eater**  
Scenario: Jordan, a busy college student, just finished a late night study session and is starving. They want to grab something quick but don’t want to repeat meals they’ve had recently.

User Journey:
- Jordan opens the app and selects “Find Food Fast”
- The system asks if they have any preferences or dietary restrictions. Jordan skips this step since they just want something different from their recent meals
- The RAG system retrieves their past dining history and suggests nearby places they haven’t visited recently
- Based on their location, the rag sorts options by proximity and estimated wait time
- Jordan selects a restaurant from this and gets yummy food quickly!

**2\. The ImpressionMaker"**  
Scenario: Alex wants to take their new partner, Sam, on a dinner date to celebrate their one-month anniversary. They want a place that is romantic but within a reasonable budget.

User Journey:
- Alex tells the rag he wants to “Impress Someone”, he provides details about their relationship (e.g., early dating stage, casual but meaningful)
- the rag asks about the preferred cuisine type, atmosphere (e.g., quiet and intimate vs. lively), and budget
- the rag analyzes restaurant reviews, ambiance descriptions, and price ranges to suggest ideal options
- alex selects a restaurant from here and has a lovely night out with his girlfriend

**3\. The Group Planner**  
Scenario: Maya and her friends want to go out for dinner before a concert. They need a place that can accommodate six people, fits their budget, and has a fun vibe.

User Journey:
- Maya tells the rag she wants to “Plan for a Group” 
- he enters the number of people in the group and the occasion (e.g., pre concert dinner).
- he rag prompts her to select a preferred cuisine, budget constraints and whether they need a place with reservations
- the rag then finds restaurants that fit the criteria, sorts them by availability, and provides reservation options
- maya books a spot and has an awesome night with her friends

**4\. The Foodie Explorer**  
Scenario: Chris, a self proclaimed foodie, loves discovering hidden gems and highly rated but lesser known spots. He wants a unique dining experience in University City.

User Journey:
- Chris tells the rag he wants to “Find a Hidden Gem” 
- he then tells it he wants unique or highly rated but less reviewed places
- the rag filters out overly popular restaurants and highlights places with strong but limited reviews
- the rag then provides a brief description of each place’s standout dishes or features
- chris picks a restaurant from here and shares their experience afterward, contributing new data to the system

**5\. The Budget Conscious Diner**  
Scenario: Taylor, a college student on a tight budget, wants to find a good meal that is affordable but still tasty.

User Journey:
- Taylor tells the rag she wants the “Best Meal on a Budget”
- she enters their maximum budget per person
- the rag then asks if they’re looking for full meals, snacks, or happy hour deals
- the rag system sorts restaurants by value, highlighting student discounts, specials, or highly rated cheap eats
- taylor picks a place from here and enjoys a great meal without breaking the bank

**Implementation:**  
**Phase 1 | Data Collection**

- We’re collecting restaurant data including cuisine, pricing, vibe, and special features, we used 4o to help us do this. We gave it the list of restuarents in University City we formulated and asked it questions like "Tell me if these restuarants are BYOB or not?" to help us make our google sheet of data.
- Then we organized everything in a google sheet so it's easy to use and implement into the RAG later

  **Phase 2 | RAG Setup via WatsonFlows**

We’re using Watsonx to connect our restaurant data to an AI system. The AI can take user input and fetch the best results based on what people want. It’s able to consider things like timing, budget, group size, and preferences before ranking the most relevant options and presenting them in a helpful way.

Relevant link: [https://developer.ibm.com/tutorials/awb-build-rag-application-watsonx-ai-flows-engine/](https://developer.ibm.com/tutorials/awb-build-rag-application-watsonx-ai-flows-engine/)


**Prompting Experiments & Development:**

* Experiment with different prompting strategies for Watsonx to refine query responses (ie “What’s a quiet place for a study date under $30?” vs “Suggest a fancy Italian restaurant”)  
* Fine tune retrieval mechanisms to balance relevancy and diversity in recommendations 
* Test user interactions with different user flows to refine response accuracy and user satisfaction

**Prompt Testing**
We tested out different ways of asking questions to see how the system responds. Here’s what we found:
- Formal vs casual questions give different tones in the results
- Example: “Where can I take someone on a date under 50 dollars?” vs “What’s a cute date spot that isn’t too expensive?”
- Open ended questions return more variety but sometimes less accuracy
- Specific questions help the system be more precise, especially with budget and vibe

**Potential Challenges:**

- Poor quality based on available data: Not all restaurant info online is complete or up to date
- Dining can be subjective: People have different opinions and expectations when it comes to food
- Individual Data Scraping from sites needs to be done carefully 
- New users won’t have a dining history, so suggestions might be less personal at first

**Alternative Approaches:**  
Build a RAG with data from:

- Penn Student Handbook  
- Other Penn Agencies / Clubs  
- Data local to Philadelphia (Housing / Crime)






