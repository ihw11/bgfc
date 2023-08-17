$(document).ready(() => {
    var mouseX;
    var mouseY;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    var shaderMouseX;
    var shaderMouseY;



    shaderWebBackground.shade({
        canvas:document.getElementById("imagec"),
        onInit: (ctx) => {

            // screen center
            mouseX = ctx.cssWidth / 2;

            mouseY = ctx. cssHeight/ 2;


        },
        onBeforeFrame: (ctx) => {
            shaderMouseX = ctx.toShaderX(mouseX);
            shaderMouseY = ctx.toShaderY(mouseY);
        },
        shaders: {
            image: {
                uniforms: {
                    mouse: (gl, loc) => gl.uniform2f(loc, shaderMouseX, shaderMouseY),
                    resolution: (gl, loc) => gl.uniform2f(loc,window.screen.width ,window.screen.height ),
                    time: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000),
                    //bb: (gl, loc, ctx) => ctx.texture(loc, ctx.iWebCam)
                }
            }
        }
    });



})