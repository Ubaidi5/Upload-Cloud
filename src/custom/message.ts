const svg = {
  success: `
      <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="19px"
      width="19px"
      xmlns="http://www.w3.org/2000/svg"
      style="color: #219125;"
    >
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
    </svg>
    `,
  loading: `
    <svg
      class="rotate-360"
      stroke="#058ef7"
      fill="#058ef7"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
    </svg>
  `,
  error: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.7679 0.767755C10.7916 -0.208556 9.20865 -0.208555 8.23234 0.767756L0.767877 8.23222C-0.208434 9.20853 -0.208432 10.7914 0.767878 11.7678L8.23234 19.2322C9.20865 20.2085 10.7916 20.2085 11.7679 19.2322L19.2323 11.7678C20.2087 10.7914 20.2087 9.20853 19.2323 8.23222L11.7679 0.767755ZM9.00005 5.99999C9.00005 5.4477 9.44776 4.99999 10 4.99999C10.5523 4.99999 11 5.4477 11 5.99999V9.99999C11 10.5523 10.5523 11 10 11C9.44776 11 9.00005 10.5523 9.00005 9.99999V5.99999ZM11 14C11 14.5523 10.5523 15 10 15C9.44776 15 9.00005 14.5523 9.00005 14C9.00005 13.4477 9.44776 13 10 13C10.5523 13 11 13.4477 11 14Z"
        fill="#D72C0D"
      />
    </svg>
  `,
};

interface config {
  duration?: number;
}

class Message {
  private createDiv(type: "success" | "loading" | "error") {
    let wrapper = document.getElementById("message-wrapper");

    if (wrapper == null) {
      wrapper = document.createElement("div");
      wrapper.setAttribute("id", "message-wrapper");
      wrapper.style.cssText = `
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999999;
        `;
      document.body.append(wrapper);
    }

    const div = document.createElement("div");
    div.innerHTML = svg[type];
    div.style.cssText = `
         display: flex;
         align-items: center;
         justify-content: center;
         box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
         border-radius: 4px;
         padding: 9px 16px;
         margin-top: 6px;
         width: max-content;
         color: ${type === "error" ? "#d72c0d" : "#000"};
         background-color: ${type === "error" ? "#fff4f4" : "#ffffff"} !important;
         border: 1px solid ${type === "error" ? "#e0b3b2" : "#dcdcdc"} !important;
       `;

    return div;
  }

  private cont(div: HTMLDivElement, config?: config) {
    document.getElementById("message-wrapper")?.append(div);

    const TIMEOUT_DURATION = config?.duration || 2;

    setTimeout(() => {
      document.getElementById("message-wrapper")?.removeChild(div);
    }, TIMEOUT_DURATION * 1000);
  }

  public success(message: string, config?: config) {
    const div = this.createDiv("success");
    div.innerHTML += `<span style="margin-left: 8px; font-size: 15px; line-height:15px;">${message}</span>`;

    this.cont(div, config);
  }

  public loading(message: string, config?: config) {
    const div = this.createDiv("loading");
    div.innerHTML += `<span style="margin-left: 8px; font-size: 15px; line-height:15px;">${message}</span>`;

    this.cont(div, config);
  }

  public error(message: string, config?: config) {
    const div = this.createDiv("error");
    div.innerHTML += `<span style="margin-left: 8px; font-size: 15px; line-height:15px;">${message}</span>`;

    this.cont(div, config);
  }
}

const message = new Message();

export default message;
