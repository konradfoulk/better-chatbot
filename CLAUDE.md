@AGENTS.md

We are working on building a better chatbot app. Right now, we are just building a basic app to get the scafolding up and learn how it works before we add in the more complex features. But the future specs are below:

***

Goal: develop a refined experience to utilize the power of ai for searching and learning information by eliminating the context switching and disorganization of switching through multiple apps and chats whenever doing research. the goal is to keep the entire exploration process contained as one connected thread with many branches and 

philosophy:
	you have this chat app and a notes app (can connect to the notes app obviously {this is a future feature though, not core to the product}), but this is your knowledge system

features:
	branching chats like git
		can branch off when you go on a tangent but don't want to dirty the main thread's context
		this is the core idea I got whenever I am talking to an ai and I have a follow up question but I don't want the entire chat to go down some crazy tangent and lose the main theme and I wish I could just branch into a new chat that has the all the context up until the point I branch off of (can branch of at any chat in the thread, no matter if it's the most recent chat or not) and answer my unrelated question
	having a pop-up sidebar that sees the state of your app or maybe just an easier way to add a chat as context for a new thing you're thinking of
		chats in this should be added to the context of the other chat
	perhaps an integrated browser window? contributing to searching idk
	could think of every chat like a traditional "project" in big chat apps, why shouldn't everything be its own project if that's bassically what it is. every subject or topic exploration is its own unit

possible optimizations/bottlenecks:
	sending all of this data to the api each time like a traditional chat would (this would effectively be the entire thread) could get very expensive, would need to break the important points down when sending context but also have the ability to search the whole history for specific points if they're referenced

basically just my dream chatbot app for getting information/knowledge. to replace all three apps on my phone. like perplexity but better almost?

***

Again, right now we are JUST BUILDING A BASIC CHATBOT MVP to understand the mechanics before we build on the rest. The only features we need to start are basic chat (sending the prompt to an API) with response (getting the ai response back as it generates) and basic persistence (creating an account and saving chats for each user, as well as being able to access and continue past chats of course)

Tools and technology:
    Next.js
    Supabase backend
    Claude api to start, will have a model selection feature later

**Logs**
