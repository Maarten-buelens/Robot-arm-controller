class sequence {

    constructor() {
        this.positions = [];
        this.selectedCardData = null;
    }
    
    recordCurrentPosition(name = "default"){
        console.log("recording position");
        let angle0 = document.getElementById("baseRange").value;
        let angle1 = document.getElementById("arm1Range").value;
        let angle2 = document.getElementById("arm2Range").value;
        let angle3 = document.getElementById("arm3Range").value;
        let servo = document.getElementById("servoRange").value;

        let position = {"name": name, "angle0": angle0, "angle1": angle1, "angle2": angle2, "angle3": angle3, "servo": servo};
        this.positions.push(position);
        console.log(this.positions);
        sequencer.showPositions()
    }

    createCard(position) {
        // Create list item
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
      
        // Create card
        const card = document.createElement('div');
        card.className = 'card';
      
        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style = "padding: 6px;";
      
        // Create card title
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = position.name;
        cardTitle.style = "text-align: center;";
      
        // Create card content
        const cardContent = document.createElement('p');
        cardContent.className = 'card-text';
        cardContent.style = "text-align: center;font-size: small;";
        cardContent.textContent = `b: ${position.angle0}) | 1: ${position.angle1}) | 2: ${position.angle2}) | 3: ${position.angle3}) | servo: ${position.servo}°`;
        let diplay = (new robotDisplay(position.angle1, position.angle2, position.angle3,0.8)).draw();

        let angledisp = (new angleDisplay(position.angle0)).getCanvas();

        // Append title and content to card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(diplay);
        cardBody.appendChild(angledisp);
        cardBody.appendChild(cardContent);
      
        // Append card body to card
        card.appendChild(cardBody);
      
        // Append card to list item
        listItem.appendChild(card);

        listItem.addEventListener('click', () => {
            // Deselect any previously selected card
            const previouslySelected = document.querySelector('.selected');
            if (previouslySelected) {
              previouslySelected.classList.remove('selected');
            }
        
            // Select the clicked card
            listItem.classList.add('selected');
            this.selectedCardData = position; // Store the selected card data
          });
      
        return listItem;
      }
      
    
    showPositions(){
        let positionsView = document.getElementById("positionsView");
        positionsView.innerHTML = "";
        this.positions.forEach((position) => {
            const card = this.createCard(position);
            positionsView.appendChild(card);
        });
    }

    moveToPosition() {
        if (this.selectedCardData) {
            document.getElementById("baseRange").value = this.selectedCardData.angle0;
            document.getElementById("arm1Range").value = this.selectedCardData.angle1;
            document.getElementById("arm2Range").value = this.selectedCardData.angle2;
            document.getElementById("arm3Range").value = this.selectedCardData.angle3;
            document.getElementById("servoRange").value = this.selectedCardData.servo;
            moveToAngles();
        } else {
          alert('No card selected.');
        }
      }
    
    clear(){
        this.selectedCardData = null;
        this.positions = [];
        sequencer.showPositions()
    }
}

