DROP FUNCTION IF EXISTS CHECK_CALENDAR_DATE;

DELIMITER $$
    CREATE FUNCTION `CHECK_CALENDAR_DATE`(`currentDate` DATE) RETURNS tinyint(1)
    BEGIN

	DECLARE total INT(11) UNSIGNED;
    DECLARE total_result INT(11) UNSIGNED;

    SELECT COUNT(calendar_date) INTO total_result FROM `calendar_table` 
        WHERE YEAR(calendar_date) = YEAR(currentDate)
	    LIMIT 1;
	
	SET @total = CAST(total_result AS UNSIGNED);

    IF (@total = 0) THEN
	    CALL FillCalendar(DATE_FORMAT(NOW(),'%Y-01-01'), DATE_FORMAT(NOW(),'%Y-12-31'));
    END IF;

    RETURN IF(@total, FALSE, TRUE);
    END$$
DELIMITER ;