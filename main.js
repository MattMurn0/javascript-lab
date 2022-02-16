fetch("Assets/data.json").then(d=>d.json()).then(data=>{
	console.log("data::",data);

renderNavBar();

});

function renderNavBar(){
	const nav =document.querySelector("nav");

	nav.innerHTML = `
			<ul>
				<li><a href="#about">About</a></li>
				<li><a href="#news">News</a></li>
				<li><a href="#projects">Projects</a></li>
			</ul>`
};