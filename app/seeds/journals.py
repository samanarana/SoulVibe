from app.models import db, Journal, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_journals():
    journal1 = Journal(
        userId=1,
        date=date.today(),
        content="Went for a run this morning and felt an incredible burst of energy afterwards. My legs were still slightly sore from yesterday's intense leg day, but pushing through that initial discomfort led to such a rewarding feeling. Definitely need to make sure I'm stretching properly to avoid any strains.",
        mood_emoji="😊"
    )
    journal2 = Journal(
        userId=2,
        date=date.today(),
        content="Started today with a calming yoga session and it was just what I needed to set a positive tone for the day. My body feels so much more limber and relaxed, and mentally, I'm in a great headspace. The deep breathing really helped in grounding my thoughts and focusing on the moment.",
        mood_emoji="🧘"
    )
    journal3 = Journal(
        userId=3,
        date=date.today(),
        content="Tried a new workout routine today and my muscles are feeling it, perhaps a bit too much. Maybe I pushed myself harder than I should have. I think tomorrow will be focused on a gentler routine and some much-needed recovery exercises. It's important to listen to what my body is telling me.",
        mood_emoji="😅"
    )
    journal4 = Journal(
        userId=4,
        date=date.today(),
        content="Experimented with a new post-workout smoothie recipe today and it was a game changer. Packed with fruits, protein, and a little bit of honey for sweetness, it revitalized me instantly. My energy levels have been consistent all day. Who knew that proper nutrition could make such a difference?",
        mood_emoji="🥤"
    )
    journal5 = Journal(
        userId=5,
        date=date.today(),
        content="Didn't get the best sleep last night and it definitely showed in my workout. My movements felt sluggish and I couldn't push myself as hard as usual. It's a reminder that rest is just as crucial as exercise for my well-being. Tonight, I'll try to wind down early and get some quality sleep.",
        mood_emoji="😴"
    )
    journal6 = Journal(
        userId=6,
        date=date.today(),
        content="Noticed some progress in my strength training today, which feels amazing. My arms were steadier, and mentally, I felt invincible. It's amazing how small changes and consistent effort lead to such progress. Looking forward to pushing my limits and seeing where this journey takes me.",
        mood_emoji="💪"
    )

    db.session.add_all([journal1, journal2, journal3, journal4, journal5, journal6])
    db.session.commit()

def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
