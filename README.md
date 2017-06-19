# Lunch-r

Get your group to actually pick a place to eat, before lunch break is over.

(the 'r' is pronounced like a pirate)

#### Live Alpha: https://lunch-r.herokuapp.com/new
Note, this is predominately a mobile-only app. The UI design is intended to make it as easy as possible to use on mobile. 

## Usage:
- Enter your group's starting location.
- Filter out any undesirable options. The more options you delete the further away the restaurants become.
- Click the green check to create a group. Currently the app gives you the three closest restaurants.
- Share the URL! Anyone who joins can vote on where to eat! You can change your vote as your hunger dictates.

## Description:
This started as personal project during my time at Turing School. The problem it helps solve is one that I've often encountered with my classmates at around lunch time. We can't decide where to eat. And nobody is making suggestions.

Lunch-r solves this by offering three lunch options that are near you. Just share the link with the group. Everyone votes, and the consensus will arise! Or maybe it won't! Democracy is hard. Regardless my hope is that lunch-r, at the very least, helped inspired the newly discovered leader of the lunch group.

### Tech Notes: 
Voting is done in real time thanks to socket.io. Backend is Express.js serving a React.js UI. 

#### Planed Features:

- Suggestions: For those group members who suddenly have another place in mind after see the suggestions, they can propose a replace for one of the current bottom two options.

- User profiles and Saved/reusable groups and group links.

- User preferences of all group members are taken into consideration. Regular, daily groups can set preference on days until yesterday's lunch spot can be put up as a suggestion again. For some groups, they may never use this option because they're content eating at the same places everyday.

- Time considerations, with set leaving/meeting times. Potentially have an alarm/reminder when it's time to lunch.


#### Dream Features: 

- Make everything voteable. Group members put up a vote to change the group name and description. Vote to replace an option. Voting has is just a yah or nah, and is secondary to the main lunch spot voting.

- Have vote cards take the place of a traditional chat room. Sending votes to change description or name work somewhat like text bubbles.

- Partner with restaurants to get real time data from any restaurant on their current or planned capacity. Use this information combined with the potential lunch data within lunch-r to rapidly generate coupons to offer within the voting page. Restaurants could have an app that allows them to quickly send out a flash-coupon that would appear with the listing on the voting page. These coupons could possibly include a catch that you have to agree to book a table online in order to use the discount. For folks who like to frequent a group of places, this sort of information exchange benefits both parties.

- "enterprise" level features:

  - Auto generate smaller lunch groups from any larger number of employees. Groups are generated with individual preferences taken into account. Basically, no vegans will end up at a steakhouse, they'll be grouped with other folks with compatible tastes.
  - Automatically book a table at the restaurant if the vote cutoff time is set to soon enough before the departure time.
