import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import { logger } from './middleware/logger.js';
import routes from './routes/api/members.js';
import { members } from './Members.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Homepage Route
app.get('/', (req, res) => {
    res.render('home', { title: 'Member App', members: members });
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'pablic')));

// Member API Routes
app.use('/api/members', routes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server started port: ${PORT}`));

