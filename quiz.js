let res = "";
document.getElementById("quizForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    let answers = {};

    for (let [key, value] of formData.entries()) {
        answers[key] = value;
    }

    // Convert to string format like Python version
let prompt = `
Career Quiz Results:

Q1. Which subject did you find the easiest and most enjoyable in Class 12th?  
A. Mathematics  
B. Physics
C. Chemistry  
D. Biology  
E. English/Languages  
F. Social Sciences  
Answer chosen: ${answers["Q1"]}

Q2. When preparing for exams, which style fits you best?  
A. Solving numerical problems  
B. Doing experiments  
C. Memorizing and recalling  
D. Writing and analyzing  
E. Reading case studies  
Answer chosen: ${answers["Q2"]}

Q3. In group projects, which role do you usually take?  
A. Problem solver  
B. Researcher  
C. Presenter  
D. Creative designer  
E. Organizer/Leader  
Answer chosen: ${answers["Q3"]}

Q4. How do you usually make decisions?  
A. Logical calculation  
B. Practical observation  
C. Intuition/feelings  
D. Discussion with people  
Answer chosen: ${answers["Q4"]}

Q5. Which of these best describes your personality?  
A. Analytical  
B. Creative  
C. Caring  
D. Confident  
E. Organized  
Answer chosen: ${answers["Q5"]}

Q6. If you had to solve a big problem, what would you do first?  
A. Break into smaller parts  
B. Experiment/test  
C. Think creatively  
D. Ask and collaborate  
E. Plan systematically  
Answer chosen: ${answers["Q6"]}

Q7. Which activity excites you the most?  
A. Coding/puzzles  
B. Experiments  
C. Helping people  
D. Writing/stories  
E. Debating/social topics  
Answer chosen: ${answers["Q7"]}

Q8. If you had a free day, what would you do?  
A. Play with gadgets  
B. Draw/create something  
C. Play sports  
D. Read/watch informative stuff  
E. Hang out and talk  
Answer chosen: ${answers["Q8"]}

Q9. Which profession do you admire most?  
A. Scientist/Engineer  
B. Doctor  
C. Artist/Writer  
D. Entrepreneur  
E. Lawyer/Politician  
Answer chosen: ${answers["Q9"]}

Q10. What motivates you most in a career?  
A. High salary  
B. Respect  
C. Creativity  
D. Helping others  
E. Stability  
Answer chosen: ${answers["Q10"]}

Q11. Which working style do you prefer?  
A. Desk analysis  
B. Meeting people  
C. Hands-on work  
D. Leading teams  
E. Expressing ideas  
Answer chosen: ${answers["Q11"]}

Q12. What kind of college excites you?  
A. Technical/Engineering  
B. Medical/Health sciences  
C. Liberal arts  
D. Business/Commerce  
E. Design/Creative  
Answer chosen: ${answers["Q12"]}

Q13. Ten years from now, where do you see yourself?  
A. Innovating in tech  
B. Helping people medically  
C. Running my own company  
D. Writing/teaching/creating  
E. Government/law field  
Answer chosen: ${answers["Q13"]}

Q14. If you fail in your chosen career, what would you do?  
A. Analyze and retry  
B. Find alternatives  
C. Switch to creativity  
D. Seek advice and support  
E. Stick with discipline  
Answer chosen: ${answers["Q14"]}

Q15. Which career cluster fits you best?  
A. Engineering/Tech/IT  
B. Medicine/Healthcare  
C. Arts/Media/Design  
D. Business/Management  
E. Law/Government  
Answer chosen: ${answers["Q15"]}

Q16. Which skill do you naturally pick up the fastest?
A. Solving logical problems
B. Understanding human body/health
C. Designing or creating something new
D. Managing money/resources
E. Arguing logically / convincing people
Answer chosen: ${answers["Q16"]}

Q17. During school, which type of competition did you enjoy most?
A. Math/Science Olympiads
B. Science exhibitions/Projects
C. Sports/Physical events
D. Debate/Model UN
E. Art/Music/Literary competitions
Answer chosen: ${answers["Q17"]}

Q18. If you got a chance to study abroad, which factor would matter most?
A. Advanced technology labs
B. Medical research opportunities
C. Exposure to arts & culture
D. Business and global markets
E. Political science/law system
Answer chosen: ${answers["Q18"]}

Q19. Which subject activity do you enjoy the most?
A. Solving derivations/equations
B. Understanding biology diagrams
C. Writing essays/stories
D. Analyzing markets & data
E. Discussing social issues
Answer chosen: ${answers["Q19"]}

Q20. What kind of work-life do you imagine for yourself?
A. Researching & innovating daily
B. Treating and caring for people
C. Expressing ideas creatively
D. Leading business ventures
E. Working in governance/policy
Answer chosen: ${answers["Q20"]}


Based on these answers, analyze the student's personality and recommend:  
1. The best-fit career path (one field).  
2. An alternative career option (one field).  
3. A short explanation (2-3 sentences).  
4. What academic courses are available in Indian colleges that can help the student pursue the above recommended career?  
`;


    document.getElementById("result").innerText = "Processing... Please wait.";

    try {
        let response = await fetch("https://quiz-backend-ns6f.onrender.com/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        let data = await response.json();
            res = data.response;
        try{ document.getElementById("result").innerHTML = data.response.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
            let flowchartBtn = document.getElementById("generateBtn");
        flowchartBtn.style.display = "block";
        }
        catch{ document.getElementById("result").innerText = data.response;
            let flowchartBtn = document.getElementById("generateBtn");
        flowchartBtn.style.display = "block";
        }
       
        
        // Example JSON data (replace with fetched data if needed)



    } catch (err) {
        document.getElementById("result").innerHTML = "Error: " + err;
    }

});

//Flowchart generation code

// Hook up the button
document.getElementById("generateBtn").addEventListener("click", async () => {
 
  let flowchart = document.getElementById("flowchart");
  let heading = document.getElementById("heading");
  heading.style.display = "block";
    flowchart.style.display = "block";
  document.getElementById("flowchart").innerText = "⏳ Generating flowchart...";
  const data1 = await fetchCareerData(res);
  renderFlowchart(data1);
});


async function fetchCareerData(prompt) {
  let response = await fetch("https://json-backend-g9sj.onrender.com/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: prompt })
  });

  let output = await response.json();

  return {
    personality_traits: output.personality_traits,
    best_fit_career: output.best_fit_career,
    alternative_career: output.alternative_career,
    short_explanation: output.short_explanation,
    academic_courses: output.academic_courses
  };
}

// Escape labels so quotes/newlines won't break Mermaid syntax
function escapeLabel(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/"/g, '\\"').replace(/\r?\n/g, " ");
}

function jsonToMermaid(data) {
  const lines = [];
  lines.push("flowchart TD");
  lines.push('  P["Personality Traits"] --> B["Best Fit Career"]');
  lines.push('  P --> A["Alternative Career"]');
  lines.push('  B --> C["Academic Courses"]');

  (data.personality_traits || []).forEach((trait, i) => {
    const id = `T${i+1}`;
    lines.push(`  P --> ${id}["${escapeLabel(trait)}"]`);
  });

  lines.push(`  B --> BF["${escapeLabel(data.best_fit_career || "")}"]`);
  lines.push(`  A --> AC["${escapeLabel(data.alternative_career || "")}"]`);

  (data.academic_courses || []).forEach((course, j) => {
    const id = `C${j+1}`;
    lines.push(`  C --> ${id}["${escapeLabel(course)}"]`);
  });

  return lines.join("\n");
}

async function renderFlowchart(data) {
  const code = jsonToMermaid(data);
  const container = document.getElementById("flowchart");

  try {
    const renderId = "careerFlowchart";
    const out = await window.mermaid.render(renderId, code);
    const svg = typeof out === "string" ? out : out.svg;
    container.innerHTML = svg;

    const svgEl = container.querySelector("svg");
    svgEl.removeAttribute("width");
    svgEl.removeAttribute("height");

    // scale up for readability
    const bbox = svgEl.getBBox();
    svgEl.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
    svgEl.setAttribute("width", bbox.width * 2);
    svgEl.setAttribute("height", bbox.height * 2);
  } catch (err) {
    container.innerHTML = `<pre class="mermaid">${code}</pre>`;
    try {
      window.mermaid.init(undefined, container);
    } catch (e) {
      container.innerText = "Failed to render Mermaid: " + e;
    }
  }
}

// Hook up the button
// document.getElementById("generateBtn").addEventListener("click", async () => {
 
//   document.getElementById("flowchart").style.display = "block";
//   document.getElementById("flowchart").innerText = "⏳ Generating flowchart...";
//   const data = await fetchCareerData(data.response);
//   renderFlowchart(data);
// });
