import { getAllOffers } from '../api/offers.js';
import { html, nothing } from '../library.js';

const catalogTemplate = (offers, page, pages) => html`
    <section id="dashboard">
        <h2>Supplies</h2>
        <ul class="offer-wrapper">
            <!-- Display products if there are any -->
            ${offers.length === 0
                    ? html`<h2>There are no products yet.</h2>`
                    : offers.map(offerCard)}
        </ul>
        <div class="pagination">
            ${page > 1
                    ? html`<a class="prev-page" href="javascript:void(0)" onclick="prevPage()">Prev</a>`
                    : nothing }
            <span class="page-info">Page ${page} of ${pages}</span>
            ${page < pages
                    ? html`<a class="next-page" href="javascript:void(0)" onclick="nextPage()">Next</a>`
                    : nothing }
        </div>
    </section>
`;

export const offerCard = (offer) => html`
    <li class="offer">
        <img src="${offer.imageUrl}" alt="example1"/>
        <p>
            <strong><span class="title">${offer.name}</span></strong>
        </p>
        <p><strong>Price:</strong><span class="price">${offer.sellPrice} $</span></p>
        <a class="details-btn" href="/offers/${offer._id}">Details</a>
    </li>
`;

export async function catalogView(ctx) {
    const offersPerPage = 3;
    let page = 1;
    const offers = await getAllOffers();
    const pages = Math.ceil(offers.length / offersPerPage);

    function showPage(page) {
        const startIndex = (page - 1) * offersPerPage;
        const endIndex = startIndex + offersPerPage;

        const pageOffers = offers.slice(startIndex, endIndex);

        ctx.render(catalogTemplate(pageOffers, page, pages));
    }


    window.prevPage = function() {
        if (page > 1) {
            page--;
            showPage(page);
        }
    }

    window.nextPage = function() {
        if (page < pages) {
            page++;
            showPage(page);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const paginationContainer = document.querySelector('.pagination');

        // Attach event listeners to the pagination links
        paginationContainer.addEventListener('click', (event) => {
            event.preventDefault();

            // Get the element that was clicked
            const clickedElement = event.target;

            // Check if the element has the prev-page class
            if (clickedElement.classList.contains('prev-page')) {
                prevPage();
            }
            // Check if the element has the next-page class
            if (clickedElement.classList.contains('next-page')) {
                nextPage();
            }


        });
    });

// Show the first page
    showPage(page);
}