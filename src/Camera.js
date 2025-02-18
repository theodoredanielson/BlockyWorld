const COLLISION_RADIUS = 0.2;
const GROUND_HEIGHT = -0.75;  // the floor level
let gameOver = false;  // Initially false, set to true when the player "cheats"
const sensitivity = 0.002; // Adjust for smoother or faster camera movement


class Camera {
    constructor() {
        // 1) Basic attributes
        this.fov = 60;
        this.eye = new Vector3([0, 0, 2]);
        this.at = new Vector3([0, 0, -1]);
        this.up = new Vector3([0, 1, 0]);
        this.yaw = 0;   // Horizontal rotation
        this.pitch = 0; // Vertical tilt (clamped between -89 and 89 degrees)


        this.alwaysUp = new Vector3([0, 1, 0]);

        // 2) View matrix
        viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );

    }

    updateViewMatrix() {
        viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }

    checkCollision(x, z, r) {
        const GROUND_HEIGHT = 0;  // The lowest allowed y-value for the camera
        let hitGround = false;
        let hitWall = false;

        // Check if the camera's Y value is below the ground
        if (this.eye.elements[1] < GROUND_HEIGHT) {
            hitGround = true;
        }

        // Proceed to check wall collisions (x/z plane)
        let centerTileX = Math.floor(x + 16);
        let centerTileZ = Math.floor(z + 16);

        for (let tileX = centerTileX - 1; tileX <= centerTileX + 1; tileX++) {
            for (let tileZ = centerTileZ - 1; tileZ <= centerTileZ + 1; tileZ++) {
                if (tileX < 0 || tileX >= 32 || tileZ < 0 || tileZ >= 32) continue;

                let height = g_map[tileX][tileZ];
                if (height == '.') {
                    height = 0;
                } else if (height == '%') {
                    height = 2;
                } else if (height == '8') {
                    height = 3;
                }

                if (height > 0) {
                    let boxMinX = tileX - 16;
                    let boxMinZ = tileZ - 16;
                    let boxMaxX = boxMinX + 1;
                    let boxMaxZ = boxMinZ + 1;

                    let closestX = this.clamp(x, boxMinX, boxMaxX);
                    let closestZ = this.clamp(z, boxMinZ, boxMaxZ);

                    let distX = x - closestX;
                    let distZ = z - closestZ;
                    let distSq = distX * distX + distZ * distZ;
                    let radiusSq = r * r;

                    if (distSq < radiusSq) {
                        hitWall = true;
                    }
                }
            }
        }

        return { hitWall, hitGround };
    }

    // Helper function to clamp values
    clamp(value, minVal, maxVal) {
        return Math.max(minVal, Math.min(maxVal, value));
    }

    forward(speed = 0.2) {
        const GROUND_HEIGHT = 0;
        const COLLISION_RADIUS = 0.2;

        // 1) Save current position
        let oldEye = new Vector3(this.eye.elements);
        let oldAt = new Vector3(this.at.elements);

        // 2) Compute forward direction (from eye to at)
        let direction = new Vector3();
        direction.set(this.at);
        direction.sub(this.eye);
        direction.normalize();
        direction.mul(speed);

        // 3) Compute candidate new positions
        let tempEye = new Vector3(oldEye.elements);
        let tempAt = new Vector3(oldAt.elements);

        tempEye.add(direction);
        tempAt.add(direction);

        // Get collision results
        let { hitWall, hitGround } = this.checkCollision(tempEye.elements[0], tempEye.elements[2], COLLISION_RADIUS);

        // 4) If the camera collides with the ground, only adjust `eye.y`, not `at.y`
        if (hitGround) {
            tempEye.elements[1] = GROUND_HEIGHT;  // Keep the camera at ground level
            tempAt.elements[1] = .9 * oldAt.elements[1];
        }

        // 5) If there's no wall collision, apply full movement
        if (!hitWall) {
            this.eye.set(tempEye);
            this.at.set(tempAt);
        } else {
            // 6) Handle sliding when hitting a wall

            // (a) Try moving only along X (keeping Y and Z unchanged)
            let xOnlyEye = new Vector3(oldEye.elements);
            let xOnlyAt = new Vector3(oldAt.elements);
            xOnlyEye.elements[0] += direction.elements[0];
            xOnlyAt.elements[0] += direction.elements[0];
            let xCollision = this.checkCollision(xOnlyEye.elements[0], xOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // (b) Try moving only along Z (keeping Y and X unchanged)
            let zOnlyEye = new Vector3(oldEye.elements);
            let zOnlyAt = new Vector3(oldAt.elements);
            zOnlyEye.elements[2] += direction.elements[2];
            zOnlyAt.elements[2] += direction.elements[2];
            let zCollision = this.checkCollision(zOnlyEye.elements[0], zOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // 7) Decide movement based on collisions
            if (!xCollision && zCollision) {
                this.eye.set(xOnlyEye);
                this.at.set(xOnlyAt);
            } else if (xCollision && !zCollision) {
                this.eye.set(zOnlyEye);
                this.at.set(zOnlyAt);
            }
        }

        // 8) Finally, update the view matrix
        this.updateViewMatrix();
    }





    // moveBackwards()
    back(speed = 0.2) {
        const GROUND_HEIGHT = 0;
        const COLLISION_RADIUS = 0.2;

        // 1) Save current position
        let oldEye = new Vector3(this.eye.elements);
        let oldAt = new Vector3(this.at.elements);

        // 2) Compute backward direction = (eye - at)
        let direction = new Vector3();
        direction.set(this.eye);
        direction.sub(this.at);
        direction.normalize();
        direction.mul(speed);

        // 3) Compute candidate new positions
        let tempEye = new Vector3(oldEye.elements);
        let tempAt = new Vector3(oldAt.elements);

        tempEye.add(direction);
        tempAt.add(direction);

        // Get coallision results
        let { hitWall, hitGround } = this.checkCollision(tempEye.elements[0], tempEye.elements[2], COLLISION_RADIUS);

        // 4) If the camera collides with the ground, only adjust `eye.y`, not `at.y`
        if (hitGround) {
            tempEye.elements[1] = GROUND_HEIGHT;  // Keep the camera at ground level
        }

        // 5) If there's no wall collision, apply full movement
        if (!hitWall) {
            this.eye.set(tempEye);
            this.at.set(tempAt);
        } else {
            // 6) Handle sliding when hitting a wall

            // (a) Try moving only along X (keeping Y and Z unchanged)
            let xOnlyEye = new Vector3(oldEye.elements);
            let xOnlyAt = new Vector3(oldAt.elements);
            xOnlyEye.elements[0] += direction.elements[0];
            xOnlyAt.elements[0] += direction.elements[0];
            let xCollision = this.checkCollision(xOnlyEye.elements[0], xOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // (b) Try moving only along Z (keeping Y and X unchanged)
            let zOnlyEye = new Vector3(oldEye.elements);
            let zOnlyAt = new Vector3(oldAt.elements);
            zOnlyEye.elements[2] += direction.elements[2];
            zOnlyAt.elements[2] += direction.elements[2];
            let zCollision = this.checkCollision(zOnlyEye.elements[0], zOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // 7) Decide movement based on collisions
            if (!xCollision && zCollision) {
                this.eye.set(xOnlyEye);
                this.at.set(xOnlyAt);
            } else if (xCollision && !zCollision) {
                this.eye.set(zOnlyEye);
                this.at.set(zOnlyAt);
            }
        }

        // 8) Finally, update the view matrix
        this.updateViewMatrix();
    }




    // moveLeft()
    left(speed = 0.2) {
        const GROUND_HEIGHT = 0;
        const COLLISION_RADIUS = 0.2;

        // 1) Save old position
        let oldEye = new Vector3(this.eye.elements);
        let oldAt = new Vector3(this.at.elements);

        // 2) Compute "left" direction
        // forward = at - eye
        let forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);

        // side = up x forward => "left" direction
        let direction = Vector3.cross(this.up, forward);
        direction.normalize();
        direction.mul(speed);

        // 3) Potential new positions
        let tempEye = new Vector3(oldEye.elements);
        let tempAt = new Vector3(oldAt.elements);
        tempEye.add(direction);
        tempAt.add(direction);

        // 4) Collision check
        let { hitWall, hitGround } = this.checkCollision(tempEye.elements[0], tempEye.elements[2], COLLISION_RADIUS);

        // 5) If the camera collides with the ground, only adjust `eye.y`, not `at.y`
        if (hitGround) {
            tempEye.elements[1] = GROUND_HEIGHT;  // Keep the camera at ground level
        }

        // 6) If there's no wall collision, apply full movement
        if (!hitWall) {
            this.eye.set(tempEye);
            this.at.set(tempAt);
        } else {
            // 7) Handle sliding when hitting a wall

            // (a) Try moving only along X (keeping Y and Z unchanged)
            let xOnlyEye = new Vector3(oldEye.elements);
            let xOnlyAt = new Vector3(oldAt.elements);
            xOnlyEye.elements[0] += direction.elements[0];
            xOnlyAt.elements[0] += direction.elements[0];
            let xCollision = this.checkCollision(xOnlyEye.elements[0], xOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // (b) Try moving only along Z (keeping Y and X unchanged)
            let zOnlyEye = new Vector3(oldEye.elements);
            let zOnlyAt = new Vector3(oldAt.elements);
            zOnlyEye.elements[2] += direction.elements[2];
            zOnlyAt.elements[2] += direction.elements[2];
            let zCollision = this.checkCollision(zOnlyEye.elements[0], zOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // 8) Decide movement based on collisions
            if (!xCollision && zCollision) {
                this.eye.set(xOnlyEye);
                this.at.set(xOnlyAt);
            } else if (xCollision && !zCollision) {
                this.eye.set(zOnlyEye);
                this.at.set(zOnlyAt);
            }
        }

        // 9) Finally, update view
        this.updateViewMatrix();
    }



    // moveRight()
    right(speed = 0.2) {
        const GROUND_HEIGHT = 0;
        const COLLISION_RADIUS = 0.2;

        // 1) Save old position
        let oldEye = new Vector3(this.eye.elements);
        let oldAt = new Vector3(this.at.elements);

        // 2) Compute "right" direction
        // forward = at - eye
        let forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);

        // side = forward x up => "right" direction
        let direction = Vector3.cross(forward, this.up);
        direction.normalize();
        direction.mul(speed);

        // 3) Compute potential new positions
        let tempEye = new Vector3(oldEye.elements);
        let tempAt = new Vector3(oldAt.elements);
        tempEye.add(direction);
        tempAt.add(direction);

        // 4) Check for collisions
        let { hitWall, hitGround } = this.checkCollision(tempEye.elements[0], tempEye.elements[2], COLLISION_RADIUS);

        // 5) If the camera collides with the ground, only adjust `eye.y`, not `at.y`
        if (hitGround) {
            tempEye.elements[1] = GROUND_HEIGHT;  // Keep the camera at ground level
        }

        // 6) If there's no wall collision, apply full movement
        if (!hitWall) {
            this.eye.set(tempEye);
            this.at.set(tempAt);
        } else {
            // 7) Handle sliding when hitting a wall

            // (a) Try moving only along X (keeping Y and Z unchanged)
            let xOnlyEye = new Vector3(oldEye.elements);
            let xOnlyAt = new Vector3(oldAt.elements);
            xOnlyEye.elements[0] += direction.elements[0];
            xOnlyAt.elements[0] += direction.elements[0];
            let xCollision = this.checkCollision(xOnlyEye.elements[0], xOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // (b) Try moving only along Z (keeping Y and X unchanged)
            let zOnlyEye = new Vector3(oldEye.elements);
            let zOnlyAt = new Vector3(oldAt.elements);
            zOnlyEye.elements[2] += direction.elements[2];
            zOnlyAt.elements[2] += direction.elements[2];
            let zCollision = this.checkCollision(zOnlyEye.elements[0], zOnlyEye.elements[2], COLLISION_RADIUS).hitWall;

            // 8) Decide movement based on collisions
            if (!xCollision && zCollision) {
                this.eye.set(xOnlyEye);
                this.at.set(xOnlyAt);
            } else if (xCollision && !zCollision) {
                this.eye.set(zOnlyEye);
                this.at.set(zOnlyAt);
            }
        }

        // 9) Finally, update the view
        this.updateViewMatrix();
    }



    // panLeft()
    panLeft(alpha = 5) {
        // f = at - eye
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);

        // Create rotation matrix
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(alpha,
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]
        );

        // Multiply rotation by forward vector => f'
        let f_prime = rotationMatrix.multiplyVector3(f);

        // at = eye + f_prime
        this.at.set(this.eye);
        this.at.add(f_prime);
        viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }

    // panRight()
    panRight(alpha = 5) {
        // f = at - eye
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);

        // Create rotation matrix (rotate by -alpha)
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(-alpha,
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]
        );

        // Multiply rotation by forward vector => f'
        let f_prime = rotationMatrix.multiplyVector3(f);

        // at = eye + f_prime
        this.at.set(this.eye);
        this.at.add(f_prime);
        viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }

    pitchUp(angle = 5) {
        // forward = at - eye
        let forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);

        // side = forward x up  (right-hand rule)
        let side = Vector3.cross(forward, this.up);
        side.normalize();

        // Create a rotation matrix that rotates by `angle` around `side` axis
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(angle,
            side.elements[0],
            side.elements[1],
            side.elements[2]
        );

        // Rotate forward vector
        let f_prime = rotationMatrix.multiplyVector3(forward);

        // Now update camera at = eye + new forward
        this.at.set(this.eye);
        this.at.add(f_prime);

        // this.up = new Vector3([0, 1, 0]);

        this.updateViewMatrix();
    }

    pitchDown(angle = 5) {
        // forward = at - eye
        let forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);

        // side = forward x up
        let side = Vector3.cross(forward, this.up);
        side.normalize();

        // Rotate by -angle around side
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(-angle, side.elements[0], side.elements[1], side.elements[2]);

        // Apply rotation to forward
        let f_prime = rotationMatrix.multiplyVector3(forward);

        // at = eye + new forward
        this.at.set(this.eye);
        this.at.add(f_prime);

        // final update
        this.updateViewMatrix();
    }
}


function updateCameraFromMouse(ev) {
    const rotationSpeed = 0.1; // Adjust for smooth rotation

    // Use movementX and movementY instead of client positions
    const dx = ev.movementX;
    const dy = ev.movementY;

    // Horizontal mouse movement => pan left/right
    if (dx !== 0) {
        const angle = dx * rotationSpeed;
        if (angle > 0) {
            camera.panRight(angle);
        } else {
            camera.panLeft(-angle);
        }
    }

    // Vertical mouse movement => pitch up/down
    if (dy !== 0) {
        const angle = dy * rotationSpeed;
        if (angle > 0) {
            camera.pitchDown(angle);
        } else {
            camera.pitchUp(-angle);
        }
    }
}
