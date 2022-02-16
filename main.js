fetch("../assets/data.json").then(d=>d.json()).then(data=>{
	console.log("data::",data);

	const urlParams = new URLSearchParams(window.location.search);
	const projectId = urlParams.get("project");
	const page = projectId==null?"main":"project-detail";

	if (page==="main"){
		renderNavBar(page);
		renderMainPage(data);
	}
	else {
		renderNavBar(page);
		const project = data.personalProjects.concat(data.classProjects).find(project=>project.id===projectId);
		renderProjectDetailPage(project);
	}
});

function renderNavBar(page){
	const nav =document.querySelector("nav");

	nav.innerHTML = page ==="main"?`
			<ul>
				<li><a href="#about">About</a></li>
				<li><a href="#news">News</a></li>
				<li><a href="#projects">Projects</a></li>
			</ul>`:`
			<ul>
				<li>
					<a href=".">Go Back</a>
				</li>
			</ul>`;
};

function renderMainPage(data){
	const main = document.querySelector("main");
	main.innerHTML = renderAbout(data.about); 
	main.innerHTML += renderNews(data.news);
	main.innerHTML += renderProjects(data.personalProjects, data.classProjects);
};

function renderAbout(about){
	return `
	<section id="about">
		<h1 class="title">
			<i class="fa-solid fa-address-card"></i>
			${about.name}
		</h1>
	</section>
	<div>
		<div class="row">
			<div class="col-6"> 
				<image class="img-container" src=${about.photo} alt="Profile picture"></image>
				<p class="bold">${about.title}</p>
				<div class="row">
					<p><i class="fa-solid fa-inbox animate__animated animate__fadeIn"></i> ${about.email} | 
						<i class="fa-brands fa-github-square animate__animated animate__fadeIn"></i> <a href="${about.github}">Github</a> |

					</p>
				</div>
			</div> 
			<div class="col-6"> <p>Matthew Murno is a Computer Science Student at Boston College. His plan is to go into either Web Development or Video Game Design as a career out of college. He challeneges himself by working on many projects in Computer Science and Art. 
				He likes to create new ways to play Video Games, as well as different aestetics to go with recording video games live. The different Art Projects he creates are just the surface of the precision and detail he puts into his work.</p>
			</div>
		</div>
	</div>
	`
};


function renderNews(news){
	return `
	<section id="news">
		<h1 class="title"><i class="fa-solid fa-newspaper"></i> News</h1>
${news.map(newsitem=>renderNewsItem(newsitem)).join("")}
	</section>
				`;
};

function renderNewsItem(newsitem) {
	return `
<div class="row">
	<div class="col-8">
		<p>${newsitem.title}</p>
	</div>
	<div class="col-4">
		<div class="dates">
			<p>${newsitem.date}</p>
		</div>
	</div>
</div>`;
};

function renderProjects(personalProjects, classProjects){
	return `
	<section id="projects">
		<h1 class="title"><i class="fa-solid fa-laptop-code"></i> Projects</h1>
		<div>
			<h3><i class="fa-solid fa-house-user"></i> Personal Projects</h3>
		<div>
		<div class="personal-project-list">
${personalProjects.map(personalProject=>renderPersonalProject(personalProject)).join("")}
		</div>
		<div>
			<h3><i class="fa-solid fa-chalkboard-user"></i> Class Projects</h3>
			<div>
		<div class="class-project-list">
${classProjects.map(classProject=>renderClassProject(classProject)).join("")}
		</div>
	</section>
	`;
};

function renderPersonalProject(personalProject){
	return `
	<div id="${personalProject.id}">
		<p><a href="?project=${personalProject.id}">${personalProject.title}</a></p>
		<image src="${personalProject.teaser}" class="img2-container"><br>
		<p>${personalProject.source}</p>
		<div class="tags">
			<p class="${personalProject.tags}">${personalProject.tags}</p>
		</div>
	</div>`
};

function renderClassProject(classProject){
	return `
	<div id="${classProject.id}">
		<p><a href="?project=${classProject.id}">${classProject.title}</a></p>
		<image src="${classProject.teaser}" class="img2-container"><br>
		<p>${classProject.source}</p>
		<div class="tags">
			<p class="${classProject.tags}">${classProject.tags}</p>
		</div>
	</div>`
};

function renderProjectDetailPage(project){
	const main = document.querySelector("main");
	main.innerHTML = `
	<div id="${project.id}">
		<h3>${project.title}</h3>
		<image src="${project.teaser}" class="img2-container"><br>
		<p>${project.source}</p>
		<p>${project.description}</p>
	</div>
	`
}