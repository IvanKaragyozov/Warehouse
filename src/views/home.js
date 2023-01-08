import { getUserData } from '../util.js';

export function homeView(ctx) {
    if (getUserData()) {
        ctx.page.redirect('/offers');
    } else {
        ctx.page.redirect("/login");
    }
}