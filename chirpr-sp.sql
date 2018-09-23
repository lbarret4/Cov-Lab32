delimiter //

CREATE PROCEDURE spUserMentions(userid int )
BEGIN
   SELECT 
		ch.id AS id,
        ch._created AS time,
        us2.name AS user,
        ch.text AS content        
	FROM chirps ch
	JOIN mentions mn ON mn.chirpid = ch.id
	JOIN users us1 ON  mn.userid = us1.id
	JOIN users us2 ON ch.userid =us2.id
	WHERE mn.userid =userid;



END //

delimiter ;