# svg-generate-favicon

เครื่องมือสร้าง favicon จากไฟล์ svg

## คำอธิบาย

`svg-generate-favicon` เป็นเครื่องมือที่ใช้สร้าง favicon และ icon ต่างๆ สำหรับเว็บแอปพลิเคชันของคุณจากไฟล์ svg เพียงไฟล์เดียว โดยจะสร้างไฟล์ `.ico` และไฟล์ `.png` ขนาดต่างๆ ตามที่กำหนดไว้ใน `manifest.json`

## คุณสมบัติ

- สร้าง favicon (.ico) จากไฟล์ svg
- สร้าง icon png ขนาดต่างๆ (16x16, 32x32, 48x48, 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512)
- สร้าง maskable icon สำหรับ Progressive Web Apps (PWA)
- รองรับการปรับแต่งขนาดและรูปแบบของ icon ผ่าน `manifest.json`

## การติดตั้ง

1.  ติดตั้ง dependencies:

    ```bash
    npm install
    ```

## การใช้งาน

1.  สร้างไฟล์ `favicon.svg` ที่เป็น source image ของคุณ
2.  แก้ไข `manifest.js` เพื่อปรับแต่งรายละเอียดของแอปพลิเคชันและ icon ต่างๆ
3.  รัน script build:

    ```bash
    npm run build
    ```

    หรือ

    ```bash
    node index.js
    ```

4.  ไฟล์ icon และ `manifest.json` จะถูกสร้างในโฟลเดอร์ `icons`

## โครงสร้างไฟล์

-   `index.js`:  script หลักในการสร้าง favicon และ icon
-   `manifest.js`:  ไฟล์ json ที่กำหนดค่าต่างๆ ของแอปพลิเคชันและ icon
-   `package.json`:  ไฟล์ที่ระบุ dependencies และ script ต่างๆ
-   `favicon.svg`:  ไฟล์ svg ที่เป็น source image ของคุณ
-   `icons/`:  โฟลเดอร์ที่เก็บไฟล์ icon ที่สร้างขึ้น

## การปรับแต่ง

คุณสามารถปรับแต่งค่าต่างๆ ใน `manifest.js` ได้ เช่น:

-   `name`:  ชื่อแอปพลิเคชัน
-   `short_name`:  ชื่อย่อของแอปพลิเคชัน
-   `description`:  คำอธิบายแอปพลิเคชัน
-   `background_color`:  สีพื้นหลังของแอปพลิเคชัน
-   `theme_color`:  สี theme ของแอปพลิเคชัน
-   `icons`:  array ของ icon ที่จะสร้าง โดยแต่ละ icon จะมี `src`, `sizes`, `type`, และ `purpose`

## Dependencies

-   [sharp](https://github.com/lovell/sharp):  สำหรับ resize และแปลงไฟล์ image
-   [to-ico](https://github.com/kevva/to-ico):  สำหรับแปลงไฟล์ png เป็น ico


## License

MIT