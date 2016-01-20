DROP PROCEDURE IF EXISTS FillCalendar;
DROP TABLE IF EXISTS calendar_table;
CREATE TABLE IF NOT EXISTS calendar_table(calendar_date DATE NOT NULL PRIMARY KEY);

DELIMITER $$
    CREATE PROCEDURE FillCalendar(start_date DATE, end_date DATE)
    BEGIN
    DECLARE crt_date DATE;
    SET crt_date = start_date;
    WHILE crt_date <= end_date DO
        INSERT IGNORE INTO calendar_table VALUES(crt_date);
        SET crt_date = ADDDATE(crt_date, INTERVAL 1 DAY);
    END WHILE;
    END$$
DELIMITER ;

CALL FillCalendar('2015-01-01', '2016-12-31');