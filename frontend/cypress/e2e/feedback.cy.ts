
describe('For customer', () => {
	beforeEach('log in as a customer',()=>{
		cy.visit('https://cedt-se-project-staysleep.vercel.app/')
		// cy.visit('http://localhost:3000')
		cy.get('a[href="/auth/signin"]').click()
		// cy.wait(2000);
		cy.get('input[name="Email"]', { timeout: 2000 }).type("thaniyakit@gmail.com")
		cy.get('input[name="Password"]').type("0643234518").get('button[type="submit"]').click();
		cy.wait(5000);
	})

	it('see review update', ()=>{
		// see
		cy.get('a[href = "/hotel"').contains("Hotels").click();
		cy.wait(5000);
		cy.get('a[href = "/hotel/66026dd5078c681403eb908b"').click();
		cy.wait(10000);
		cy.get('[data-test-id="review"').should('have.length.greaterThan',0);
		cy.wait(5000);

		let random_string = ''
		let random_ascii
		for (let i = 0; i < 10; i++) {
			random_ascii = Math.floor(Math.random() * 25 + 97)
			random_string += String.fromCharCode(random_ascii)
		}

		//write review
		cy.get('a[href = "/bookings/manage"', { timeout: 5000 }).click();
		// cy.wait(5000);
		cy.get('a[href="/hotel/66026e06078c681403eb908e/add-review/661c191261220ebde386a1bf"]', { timeout: 8000 }).click();
		// cy.wait(10000);
		cy.get('textarea[name="review"]',{ timeout: 12000 }).click().type(random_string);
		
		const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
		
		cy.get('input[type=range]')
			.should('have.value',30)
			.then($slider =>{
				valueSetter?.call($slider[0],45);
			})
			.trigger('change')
		cy.get('button').contains('Submit').click();
		cy.wait(5000);
		cy.get(`[data-test-id="${random_string}"]`, { timeout: 10000 }).should('be.visible');

		// update
		cy.get('[data-test-id="name"]').contains('Aomsin').as('Review')
		cy.get('img[alt="edit icon"]').click({force:true});
		const valueSetter2 = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
		cy.get('input[type=range][value=45]')
			.then($slider =>{
				valueSetter2?.call($slider[0],20);
			})
			.trigger('change',{force:true})
		cy.get('textarea[name="review-message"]:not([disabled])').click({force:true}).type("edit");
		cy.get('button').filter(':visible').contains("Save").click({ force: true });
		cy.wait(2500);

	});

	// it('review hotel', () => {
	// 	cy.get('a[href = "/bookings/manage"').click();
	// 	cy.wait(5000);
	// 	cy.get('a[href="/hotel/66026e06078c681403eb908e/add-review/661c191261220ebde386a1bf"]').click();
	// 	cy.wait(5000);
	// 	cy.get('textarea[name="review"]').click().type("This Hotel is Good!!");
		
	// 	const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
		
	// 	cy.get('input[type=range]')
	// 		.should('have.value',30)
	// 		.then($slider =>{
	// 			valueSetter?.call($slider[0],45);
	// 		})
	// 		.trigger('change')
	// 	cy.get('button').contains('Submit').click();
	// 	cy.wait(2000);

		

	// });
	
	// it('see review hotel', () => {
	// 	cy.get('a[href = "/hotel"').contains("Hotels").click();
	// 	cy.wait(5000);
	// 	cy.get('a[href = "/hotel/66026dd5078c681403eb908b"').click();
	// 	cy.wait(5000);
	// 	cy.get('[data-test-id="review"').should('have.length.greaterThan',0);
	// 	cy.wait(5000);
	// });

	// it ('edit review', () =>{
	// 	cy.get('a[href = "/hotel"').contains("Hotels").click();
	// 	cy.wait(5000);
	// 	cy.get('a[href = "/hotel/66026e06078c681403eb908e"').click();
	// 	cy.wait(10000);
		
		
	// 	cy.get('img[alt="edit icon"]').click({force:true});
	// 	const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
	// 	cy.get('input[type=range][value=45]')
	// 		.then($slider =>{
	// 			valueSetter?.call($slider[0],20);
	// 		})
	// 		.trigger('change',{force:true})
	// 	cy.get('textarea[name="review-message"]:not([disabled])').click({force:true}).type("edit");
	// 	cy.get('button').filter(':visible').contains("Save").click({ force: true });
	// });
	
});


describe('For Admin', () => {
	before('log in as a admin',()=>{
		cy.visit('https://cedt-se-project-staysleep.vercel.app/')
		// cy.visit('http://localhost:3000')
		cy.get('a[href="/auth/signin"]').click()
		cy.wait(2000);
		cy.get('input[name="Email"]', { timeout: 10000 }).type("admin@gmail.com")
		cy.get('input[name="Password"]').type("123456").get('button[type="submit"]').click();
		cy.wait(5000);
	})

	it('reply', ()=>{
		let random_string = ''
		let random_ascii
		for (let i = 0; i < 10; i++) {
			random_ascii = Math.floor(Math.random() * 25 + 97)
			random_string += String.fromCharCode(random_ascii)
		}

		cy.get('a[href = "/hotel"').contains("Hotels").click();
		cy.wait(5000);
		cy.get('a[href = "/hotel/66026dd5078c681403eb908b"',{ timeout: 10000 }).click();
		cy.wait(2000);
		cy.get('a[href="/hotel/66026dd5078c681403eb908b/review/6621190f5f89aee4e9fe5c5c"]', { timeout: 10000 }).click();
		cy.wait(8000);
		cy.get('textarea', { timeout: 10000 }).click().type(random_string);
		cy.get('button').contains('Submit').click();
		cy.wait(2500);
		cy.get(`[data-test-id="${random_string}"]`, { timeout: 10000 }).should('be.visible');
		// cy.wait(10000);
		// cy.get('a[href = "/hotel"').contains("Hotels").click();
		// cy.wait(5000);
		// cy.get('a[href = "/hotel/66026dd5078c681403eb908b"').click();
		// cy.wait(10000);
	})
	
	
});