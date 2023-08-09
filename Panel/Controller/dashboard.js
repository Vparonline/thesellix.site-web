const { Client, Intents, Permissions } = require('discord.js');
const config = require("./Moderation/Configs/config.json");
const Discord = require("discord.js");

const express = require('express');
const app = express();
const bParser = require("body-parser");
const cParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");

const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-discord');
const moment = require('moment');
const e = require('express');
moment.locale('tr');

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use(cParser());
app.set('views', path.join(__dirname, './Moderation/Panel/Controller'));
app.use('/css', express.static(path.join(__dirname, './Moderation/Panel/Controller/Yol/assets/css')));
app.use(session({ secret: 'xd', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((obj, done) => { done(null, obj) });
const izinler = ["identify", "guilds"];
passport.use(new Strategy({
    clientID: config.BotBağlıozAşkom.clientID,
    clientSecret: config.BotBağlıozAşkom.clientSecret,
    callbackURL: config.BotBağlıozAşkom.callbackURL,
    scope: izinler
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));
 

app.get("/login", passport.authenticate("discord", { scope: izinler, }));
app.get('/callback', passport.authenticate("discord", { failureRedirect: '/error' }), async (req, res) => { const allah = await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID}); res.redirect('/dash'); 
});
app.get('/logout', (req, res) => { req.logOut(); return res.redirect('/'); });

app.get('/', async (req, res) => { res.redirect('/login') })

app.get('/error', async (req, res) => { res.render('hata', { user: req.user, bot: client }); })
app.get('/404', async (req, res) => { res.render('404', {user: req.user, bot: client }); });
app.get('/dash', async (req, res) => { if (!["1067476859933179954","500325853108895744"].some(x => req.user.id === x) )
return res.redirect('/404'); res.render('dash', { user: req.user, bot: client }) 
})

app.get('/dash', async (req, res) => { if (!["1067476859933179954","500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('dash', { user: req.user, bot: client, allah1: await setupdurum.findOne({guildID: config.BotBağlıozAşkom.guildID}), data: await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID });})

app.listen(443, () => console.log(`İç şarabı, sik arabı`));
