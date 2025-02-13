# CS-465-Fullstack
CS-465 Full Stack Development with MEAN

Journal Reflection
Architecture
Compare and contrast the types of front-end development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

In Project Travlr, we utilized different frontend development approaches, including Express-based HTML with JavaScript (SSR) and a single-page application (SPA). Express-based HTML with JavaScript follows the traditional server-side rendering (SSR) model, where the HTML is generated on the server using Express.js, and the fully constructed pages are sent to the client. This method offers advantages like improved SEO, as search engines can easily crawl and index the pre-rendered HTML. It also reduces the need for complex client-side frameworks, keeping the architecture simpler for smaller applications.
On the other hand, a single-page application (SPA) loads only a single HTML page at the start, with all interactions handled dynamically through JavaScript. Instead of reloading the entire page, data is fetched from the server via API calls, typically in JSON format, and the UI updates seamlessly without a full page reload. Although SPAs are more complex to develop, they provide a faster, smoother, and more responsive user experience, making them ideal for dynamic, user-driven applications.

Why did the backend use a NoSQL MongoDB database?

The project’s backend leveraged a NoSQL MongoDB database primarily for its flexibility, scalability, and seamless integration with the technology stack. As a schema-less database, MongoDB provides significant flexibility in data modeling, allowing the structure to evolve as the application grows without the constraints of rigid schemas. Its scalability ensures that the database can easily expand alongside the application’s needs. Additionally, MongoDB’s document-based, JSON-like storage format integrates effortlessly with the stack, making it ideal for managing data without the need for complex relationships between entities. This allows for smoother data handling and a more efficient development process.

Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?

The key difference between JSON and JavaScript lies in their functions. JSON is a lightweight data interchange format, designed to be easily read and written by both humans and machines. In contrast, JavaScript is a full-featured programming language used to execute complex logic, manipulate the Document Object Model (DOM), and create interactive web applications. Despite this difference, JSON serves as a crucial link between the frontend and backend, providing a standardized and efficient format for exchanging data across different layers of an application.

Provide instances in the full stack process when you refactored code to improve functionality and efficiencies and name the benefits that come from reusable user interface (UI) components.
During the refactoring process, I focused on the frontend while building the user interface with Angular. Initially, there was a lot of repetitive HTML and JavaScript for rendering similar UI components, such as trip cards and inventory items. To improve this, I refactored the code by creating reusable UI components like TripCardComponent and InventoryGridComponent. This allowed the same components to be reused throughout the application for displaying various types of data. The refactoring significantly reduced code redundancy, improved maintainability, and made the UI more modular and scalable.

Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

In a full stack application, methods, endpoints, and security are critical to how data moves between the frontend and backend, ensuring that this data is transmitted securely and efficiently. HTTP methods like GET, POST, PUT, and DELETE define how data is sent and retrieved, while endpoints serve as access points for these methods. Security layers, such as authentication and authorization, safeguard the integrity, confidentiality, and availability of the system. Testing these components becomes more complex when security is involved, as it requires handling token-based authentication, role-based access control, secure data transmission, and proper error handling. Despite the added complexity, thorough testing is essential for maintaining a secure and functional application.

Reflection
How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course has been pivotal in advancing my professional goals by enhancing my technical skills and providing practical experience with key technologies in full stack development. The comprehensive understanding of both frontend and backend development, along with the hands-on projects, has greatly increased my confidence and prepared me to contribute effectively to teams in professional environments.

