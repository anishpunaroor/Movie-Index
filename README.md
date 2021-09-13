# The Movie Index

The Movie Index is a static website that I designed in order to learn Javascript and front-end development in general. This allows users to search for any movie, filter by genre, and sort by popularity. I have also incorporated pagination into the website so users can browse multiple pages of the provided results. 

### **[Visit The Movie Index](https://main.d1gg1ja2f25ag4.amplifyapp.com/)**

## Design

The Movie Index is built using vanilla Javascript, HTML and CSS, and I integrated Bootstrap to help with the navigation bar and button components. 

This website is powered by [The Movie Database](https://www.themoviedb.org)'s free API. One issue I have noticed is that some of the movies retrieved using this API do not have corresponding posters or overviews, resulting in a blank image/description. 

For an added challenge and simplicity, I did not use any other UI layout frameworks in The Movie Index.

The website was deployed using AWS Amplify. 

## Todo 

- [ ] Add user authentication/ allow users to sign in
- [ ] Allow users to click on movie to get information about trailers and reviews
- [ ] Users can search for actors 

## Credit

I based this project upon FlorinApp's movie app tutorial ([Video Link](https://www.youtube.com/watch?v=sZ0bZGfg_m4&t=1951s)), to which I added additional features like sorting and genre filters. 
