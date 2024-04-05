document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select class="color-scheme-selector"> 
			<option value="light dark"> Automatic </option>
			<option value="light"> Light </option>
			<option value="dark"> Dark </option>
		
		</select>
	</label>`
);

var select = document.querySelector(".color-scheme-selector");

select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
	document.documentElement.style.setProperty("color-scheme",event.target.value);
	var colorScheme;
	localStorage.colorScheme = event.target.value;
	console.log("colorScheme", event.target.value);
});

if("colorScheme" in localStorage){
	var colorScheme = localStorage.getItem("colorScheme");
	document.documentElement.style.setProperty("color-scheme",colorScheme);
}



