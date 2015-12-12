#Pomodori Task Tracker

###Introduction
This project is inspired by the [Pomodori Technique](http://lifehacker.com/productivity-101-a-primer-to-the-pomodoro-technique-1598992730) which I found out after reading this [Simple Programmer's blog post](http://simpleprogrammer.com/2014/02/17/secret-ridiculous-productivity-im-using-now/) about focusing and improving productivity. The principle of this method is as follow (quoted from the first article):

1. Choose a task to be accomplished.
2. Set the Pomodoro to 25 minutes (the Pomodoro is the timer)
3. Work on the task until the Pomodoro rings, then put a check on your sheet of paper
4. Take a short break (5 minutes is OK)
5. Every 4 Pomodoros take a longer break

###How to use
![Screenshot](https://cloud.githubusercontent.com/assets/5102383/11763131/52c2e0d2-a131-11e5-80b7-d676a75da78a.png)
The usage is easy to follow as the screenshot has shown. There are some things to keep in mind though:
- After the timer end (either resting or finishing a pomodori), the ```ending.mp3''' will be played. You can replace it with another sound you like.
- The list of tasks will be written in a file called ```report.txt'''. The structure is: a list of pair ```(Datetime \newline Task name)''', I should change the way of storing data later.
- Maximum task name is 200, if you input more than 200 character, it will automatically truncate.
- Minimum waiting time (podomoring working task or resting time) is 1 minute.
- You can quit the app anytime by pressing ```^ + C'''. The in-progress task won't be saved.

### Notice
- Version 0.0.1: This is the result of 2-hour coding excitement I have after reading a chapter of the [Soft skill - Software Developer Life's Manual Book](http://www.amazon.com/Soft-Skills-software-developers-manual/dp/1617292397), which is similar to the article I mentioned in the Introduction. The storing data method is bad (raw text), shouldn't open 2 instances of the app in the same time (you literally shouldn't do this).
