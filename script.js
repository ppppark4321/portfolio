function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("show");
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;
    const responseDiv = document.getElementById("responseMessage");

    responseDiv.style.display = "block";
    responseDiv.style.color = "#1a73e8";
    responseDiv.innerText =
      "AI 에이전트가 질문을 분석 중입니다... 잠시만 기다려주세요.";

    const makeWebhookUrl = "https://hook.us1.make.com/your_unique_webhook_id";

    try {
      const response = await fetch(makeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_name: name,
          visitor_email: email,
          visitor_message: message,
        }),
      });

      if (response.ok) {
        responseDiv.style.color = "#188038";
        responseDiv.innerText =
          "질문이 성공적으로 접수되었습니다! 입력하신 메일로 AI의 답변이 곧 발송됩니다.";
        contactForm.reset();
      } else {
        throw new Error("Server response failed");
      }
    } catch (error) {
      responseDiv.style.color = "#d93025";
      responseDiv.innerText =
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  });
}
