window.generateMarque = function (className) {
  return `
        <div class="marquee ${className}">
        ${new Array(16)
          .fill(0)
          .map((n) => {
            return '<p class="marquee-content">CRIME SCENE - DO NOT CROSS</p>';
          })
          .join("")}
        </div> 
    `;
};
