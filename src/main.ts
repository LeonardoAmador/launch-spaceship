const allSpaceships: {
    name: string;
    pilot: string;
    crewLimit: number;
    crew: string[];
    inMission: boolean;
}[] = [];

const throwError = (message: string): never => {
    throw new Error(message);
}

const createSpaceship = (name: string, pilot: string, crewLimit: number) => {
    const spaceship = {
        name,
        pilot,
        crewLimit,
        crew: [] as string[],
        inMission: false
    };

    return spaceship;
};

const getSpaceshipInfoFromPrompt = (): void => {
    const name = prompt('Enter the spaceship name: ');
    const pilot = prompt('Enter the pilot name: ');
    const crewLimit = Number(prompt('Enter the crew limit: '));

    if (typeof name !== 'string' || typeof pilot !== 'string') {
        console.error('Name and pilot must be strings.');
    } else {
        allSpaceships.push(createSpaceship(name, pilot, crewLimit));
    }
};

const getNewSpaceshipMemberInfoFromPrompt = (): string => {
    const spaceshipToAdd = prompt('What is the spaceship to add a member? ');

    // Se o valor for nulo ou undefined o retorno será uma string vazia
    return spaceshipToAdd ?? "";
}

const findSpaceshipToAddMember = () => {
    const spaceshipToAdd = getNewSpaceshipMemberInfoFromPrompt();

    const spaceshipFounded = findSpaceshipByName(spaceshipToAdd);

    if (spaceshipFounded) {
        const isCorrectSpaceship: boolean = confirm(`Spaceship found:
        Name: ${spaceshipFounded.name}
        Pilot: ${spaceshipFounded.pilot}
        Crew Limit: ${spaceshipFounded.crewLimit}
        Crew: ${spaceshipFounded.crew}
        In Mission: ${spaceshipFounded.inMission} `)

        return isCorrectSpaceship ? 
        addnewSpaceshipMember(spaceshipFounded) : getNewSpaceshipMemberInfoFromPrompt();
    } else {
        alert('Spaceship not found');
        return null;
    }
};

const addnewSpaceshipMember = (spaceship: {
    name?: string;
    pilot?: string;
    crewLimit: number;
    crew: string[];
    inMission?: boolean;
}): void => {
    const { crew } = spaceship;
    const memberName = prompt('Enter the member name: ');

    if (crew.length < spaceship.crewLimit) {
        const isValidMember = typeof memberName === "string" && memberName.trim() !== "";

        isValidMember ? crew.push(memberName) : alert('Invalid member name.');

        if (isValidMember) {
            alert(`${memberName} added to the spaceship's crew.`);
        }
    } else {
        alert("The spaceship's crew is already at its limit.");
    }
};

const findSpaceshipByName = (name: string) => {
    return allSpaceships.find((spaceship) => spaceship.name === name);
};

const sendSpaceshipToMission = (): void => {
    const launchSpaceship = prompt('Which spaceship would you like to launch? ');

    if (typeof launchSpaceship !== "string" ) {
        alert('Please enter a valid spaceship name.');
        return;
    }

    const spaceshipToLaunch = findSpaceshipByName(launchSpaceship);

    if (spaceshipToLaunch) {
        const oneThird = Math.floor(spaceshipToLaunch.crew.length / 3);

        if (spaceshipToLaunch.crew.length < oneThird) {
            alert('The current crew must be equal to or higher than 1/3 of the crew limit.');
        } else {
            if (!spaceshipToLaunch.inMission) {
                spaceshipToLaunch.inMission = true;
                alert(`Spaceship "${spaceshipToLaunch.name}" has been launched on a mission.`);
            } else {
                alert(`Spaceship "${spaceshipToLaunch.name}" has already been launched on a mission.`);
                return;
            }
        }
    } else {
        alert('Spaceship not found.');
    }
};

const listAllSpaceships = (): void => {
    if (allSpaceships.length === 0) {
        alert('No spaceships to be listed.');
    } else {
        allSpaceships.forEach(({ name, pilot, crewLimit, crew, inMission }) => {
            alert(`Spaceship:
            Name: ${name}
            Pilot: ${pilot}
            Crew Limit: ${crewLimit}
            Crew: ${crew.map((crewMember) => ` ${crewMember}`)}
            In Mission: ${inMission}`);
        });
    }
};

const displayMenu = (): void => {
    let choice: string | null = "";

    while(choice !== "5") {
        const options = `Menu:
        1. Create a spaceship
        2. Add a member to an existing spaceship
        3. Launch a spaceship
        4. List spaceship
        5. Exit`;
    
        choice = prompt(options);
    
        switch (choice) {
            case '1':
                getSpaceshipInfoFromPrompt();
                break;
            case '2':
                findSpaceshipToAddMember();
                break;
            case '3':
                sendSpaceshipToMission();
                break;
            case '4':
                listAllSpaceships();
                break;
            case '5': 
                alert('Exiting the Menu.');
                break;
            default:
                alert('Invalid choice.');
                break;
        }
    }
};

displayMenu();