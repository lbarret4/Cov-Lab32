delimiter //

CREATE PROCEDURE spUserMentions(userid int )
BEGIN
   SELECT 
        ch.id AS ChirpId,
        ch.text AS ChirpText,
        ch._created AS ChirpDate
    FROM chirps ch
    JOIN mentions mn ON mn.chirpid = ch.id
    JOIN users us ON  mn.userid = us.id
    WHERE mn.userid = userid;



END //

delimiter ;