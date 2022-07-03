'use strict';

class Rectangles {
    static intersect(a, b) {
        return a.x < (b.x + b.width) && (a.x + a.width) > b.x && a.y < (b.y + b.height) && (a.y + a.height) > b.y;
    }

    static touches(a, b) {
        const a_x2 = a.x + a.width;
        const a_y2 = a.y + a.height;

        const b_x2 = b.x + b.width;
        const b_y2 = b.y + b.height;
        
        // has horizontal gap
        if (a.x > b_x2 || b.x > a_x2) return false;
    
        // has vertical gap
        if (a.y > b_y2 || b.y > a_y2) return false;
       
        //check corners of b 
        if (a_x2 === b.x && a_y2 === b.y) return false;
        if (a.x === b_x2 && a_y2 === b.y) return false;
        if (a_x2 === b.x && a.y === b_y2) return false;
        if (a.x === b_x2 && a.y === b_y2) return false;
    
        return true;
    }

    static square(r) {
        return r.width * r.height;
    }
}