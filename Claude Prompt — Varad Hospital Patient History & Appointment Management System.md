# VARAD HOSPITAL — Patient History, Appointment & Prescription Management Upgrade

You are a senior full-stack engineer, healthcare product designer, database architect, and UX engineer.

I already have a working hospital website/admin panel for **Varad Hospital / Varad Netralaya**.

DO NOT rebuild the project from scratch.

First inspect the existing project carefully:
- existing frontend architecture
- backend/API architecture
- database/schema
- authentication
- admin routes
- appointment functionality
- existing design system
- reusable components
- current patient data
- current appointment data

Then extend the existing application while preserving its current visual language.

The current admin panel already contains:

- Dashboard
- Appointments
- Doctor Profile
- Eye Care / Services
- Advanced Equipment
- Gallery
- Patient Information
- Guidelines
- Insurance / TPA
- Reviews
- Settings

The current appointment screen already contains:
- appointment information
- patient details
- issue/symptoms
- status
- action buttons

I now want to convert this into a much more complete **patient-centric hospital management system**.

---

# 1. CORE ARCHITECTURE — PATIENT IS THE PRIMARY ENTITY

This is the most important requirement.

Do NOT treat every appointment as a completely independent patient record.

Architecture must follow:

PATIENT
→ APPOINTMENTS
→ VISITS / CONSULTATIONS
→ DIAGNOSIS
→ PRESCRIPTIONS
→ MEDICINES
→ CLINICAL NOTES

A patient should have ONE permanent patient profile.

The same patient may have:

1 Patient
→ many Appointments
→ many Visits
→ many Prescriptions

Never overwrite old visit information when a patient returns.

Maintain complete longitudinal patient history.

---

# 2. UNIQUE PATIENT ID / UHID

Whenever a completely new patient books an appointment for the first time, automatically generate a permanent unique Patient ID / UHID.

Example:

VH-2026-000001

or

VN-000001

Use the naming convention most suitable for the existing system.

This ID must remain permanently attached to the patient.

Show the Patient ID prominently on:

- patient profile
- appointment details
- patient search
- prescription
- printable prescription
- PDF
- visit history

The patient should be searchable using this ID.

---

# 3. RETURNING PATIENT DETECTION

When someone books another appointment, the system must attempt to determine whether the patient already exists.

Check using appropriate normalized identifiers such as:

1. Patient ID / UHID — strongest match
2. Mobile number
3. Email if available
4. Name + mobile number
5. Other safe matching logic

Do NOT rely only on patient name because multiple people can have the same name.

If an exact unique match is found:

DO NOT create another patient.

Create a new appointment linked to the existing patient.

If multiple possible matches exist, do NOT silently merge them.

Show:

"Possible Existing Patient"

and allow the authorized admin/doctor to select the correct patient.

Never automatically merge ambiguous records.

---

# 4. QUICK RETURNING PATIENT APPOINTMENT

Add a fast workflow for returning patients.

Admin should be able to enter:

Patient ID / UHID

OR

Mobile Number

OR

Patient Name

Then the system searches existing patients.

When selected, automatically populate available patient details such as:

Name
Patient ID
Phone
Email
Age / DOB
Gender

Then admin only needs to select:

Appointment Date
Appointment Time
Reason / Complaint

and create the appointment.

This appointment must be attached to the SAME patient profile.

---

# 5. GLOBAL PATIENT SEARCH

Create a prominent:

"Search Patient"

function.

Search should support:

- Patient ID / UHID
- Patient Name
- Mobile Number
- Email
- Appointment ID

Partial search should work where appropriate.

Example:

Searching:

Ramesh Sharma

should show:

Ramesh Sharma
Patient ID: VH-2026-000021
Mobile: ••••••3210
Age
Gender
Last Visit
Next Appointment
Total Visits

Clicking the patient should open their complete patient profile/history.

Use privacy-conscious display patterns in broad search results where appropriate; show full contact information only to authorized users.

---

# 6. PATIENT PROFILE / COMPLETE HISTORY

Create a dedicated:

PATIENT PROFILE

page.

Header should show:

Patient Name
Patient ID / UHID
Age / DOB
Gender
Phone
Email
Address if available

Also show useful summary information:

First Visit
Last Visit
Total Visits
Upcoming Appointment
Last Prescription

Then create tabs:

Overview
Visit History
Appointments
Prescriptions
Medicines
Clinical Notes

---

# 7. PATIENT TIMELINE

Inside Patient Profile, create a chronological timeline.

Example:

22 Aug 2026
Appointment
Complaint: Blurry vision

22 Aug 2026
Consultation
Diagnosis: [doctor entered diagnosis]

22 Aug 2026
Prescription
Medicines: 3 medicines

10 Jun 2026
Follow-up
Complaint: Eye irritation

etc.

Newest information should be easy to access while preserving all older records.

Provide filters such as:

All
Appointments
Visits
Prescriptions
Completed
Cancelled

---

# 8. VISIT / CONSULTATION RECORD

Every actual consultation should create a separate visit record.

Visit fields should support:

Visit ID
Patient ID
Appointment ID
Visit Date
Visit Time
Doctor
Chief Complaint
Symptoms
Diagnosis
Clinical Notes
Advice
Follow-up Date
Prescription
Visit Status

For ophthalmology, structure the schema so eye-specific clinical fields can be added later without breaking old records.

Do not destroy previous visit data when new information is entered.

---

# 9. APPOINTMENTS SCREEN — REDESIGN ACTIONS

Improve the current Appointments screen shown in my existing project.

The action buttons are currently too icon-dependent.

Make actions much clearer.

Each appointment row should make these actions obvious:

VIEW
APPROVE / CONFIRM
REJECT
PENDING
EDIT
DELETE
MEDICAL / PRESCRIPTION

Do not hide all important actions behind ambiguous icons.

Recommended behavior:

Primary actions can use icon + text labels.

Less common actions can go inside a clearly labeled:

"More"

menu.

Status-changing actions should be immediately understandable.

---

# 10. APPOINTMENT STATUS SYSTEM

Use clear statuses:

Pending
Confirmed
Completed
Rejected
Cancelled

Use distinct but soft badges.

Suggested semantic treatment:

Pending → amber
Confirmed → blue
Completed → green/teal
Rejected → red
Cancelled → neutral gray

Do not use color alone.

Always display status text.

---

# 11. APPROVE / CONFIRM APPOINTMENT

When admin clicks:

Approve / Confirm

show confirmation if appropriate.

Then update:

status = Confirmed

Keep:

updated_at
updated_by

where the backend supports audit information.

Do not delete or replace historical data.

---

# 12. REJECT APPOINTMENT

When admin clicks:

Reject

open a small modal.

Optional reason:

Reason for rejection

Then save:

status = Rejected

Do NOT delete the appointment.

Rejected appointments should remain visible in patient history.

---

# 13. PENDING ACTION

Allow authorized admin to return an appointment to:

Pending

when appropriate.

Keep status history/audit trail if supported by the architecture.

---

# 14. DELETE SAFETY

Delete is destructive.

Never perform immediate one-click deletion.

Show confirmation:

"Are you sure you want to delete this appointment?"

Where medically/operationally appropriate, prefer:

soft delete / archive

instead of permanent database deletion.

Historical visits, prescriptions, and clinically relevant records should not disappear because an appointment row was deleted.

Use permissions for destructive actions.

---

# 15. VIEW APPOINTMENT DETAILS

When clicking:

View

open a detailed page or large drawer.

Show:

## Patient
Patient Name
Patient ID
Phone
Email
Age
Gender

## Current Appointment
Appointment ID
Date
Time
Status
Issue / Symptoms

## Previous History
Last Visit
Previous Complaints
Previous Diagnosis
Previous Medicines
Previous Advice
Previous Follow-up

Also provide:

View Full Patient History

This is critical.

The doctor/admin should immediately understand whether this is a returning patient.

---

# 16. MEDICAL / PRESCRIPTION BUTTON

Add a clear button:

Medical / Prescription

for every patient/appointment where appropriate.

Opening it should show the patient's prescription and medicine history.

Sections:

CURRENT PRESCRIPTION

PREVIOUS PRESCRIPTIONS

MEDICINE HISTORY

The doctor should immediately be able to see what medicines were previously prescribed.

---

# 17. PRESCRIPTION CREATION

Create a proper prescription editor.

Header:

VARAD HOSPITAL / VARAD NETRALAYA
Doctor Details
Hospital Details

Patient:

Patient Name
Patient ID
Age
Gender
Visit Date

Clinical section:

Complaint
Diagnosis
Advice

Medicine table:

Medicine Name
Strength
Dose
Frequency
Duration
Route
Instructions

Example frequency values:

Once daily
Twice daily
Three times daily
Morning
Night
As advised

But allow custom instructions.

Allow:

+ Add Medicine
Remove Medicine

Do not fabricate medication names or dosage recommendations.

Only store what the authorized clinician enters.

---

# 18. MEDICINE SEARCH

When entering a medicine, provide searchable medicine selection if the existing project/database supports a medicine master.

Search by:

Medicine Name

Optionally support:

Generic Name
Brand Name

Do not automatically prescribe medicines.

Search is only for selection.

---

# 19. PREVIOUS MEDICINE HISTORY

This is important.

When doctor opens a patient:

show:

Previous Medicines

Example:

Medicine | Dose | Duration | Prescribed Date | Visit

The doctor should be able to see previous prescriptions without manually searching old appointments.

However, previous medicines must NOT be automatically added to a new prescription.

Historical information is reference only.

---

# 20. PRINT PRESCRIPTION

Add:

Print Prescription

Generate a clean A4 printable layout.

Include:

Hospital Logo
Hospital Name
Address
Phone
Doctor Name
Qualification
Registration Number — only if stored/verified
Patient Name
Patient ID
Age
Gender
Date
Diagnosis
Medicine Table
Advice
Follow-up
Doctor signature area

The printed output must be professional and readable.

Do not print admin navigation or browser UI.

---

# 21. PDF DOWNLOAD

Add:

Download PDF

Generate the same prescription in a professional PDF.

Suggested filename:

Prescription_VH-2026-000021_2026-08-22.pdf

The PDF must contain only verified/stored information.

---

# 22. EMAIL PRESCRIPTION

Add:

Email Prescription

When clicked:

show patient's stored email.

Allow authorized user to confirm before sending.

Email should contain:

patient-friendly subject
short message
prescription PDF attachment

Example subject:

Your Prescription — Varad Hospital

Record, where supported:

sent_at
recipient
prescription_id
delivery status

Do not expose other patients' information.

---

# 23. APPOINTMENT TABLE IMPROVEMENT

Improve current table columns.

Recommended:

Appointment
Patient
Date & Time
Issue / Symptoms
Last Visit
Status
Actions

Patient cell:

Patient Name
Patient ID
Phone

Appointment cell:

Appointment ID

Last Visit:

date
or
New Patient

Actions must remain visible and easy to understand.

---

# 24. SEARCH & FILTERS ON APPOINTMENTS

Keep a search field at top.

Placeholder:

"Search patient, Patient ID, phone, appointment ID..."

Filters:

All Status
Pending
Confirmed
Completed
Rejected
Cancelled

Also support date filtering:

Today
Tomorrow
This Week
Custom Date

Add:

Clear Filters

---

# 25. DASHBOARD IMPROVEMENTS

Keep existing dashboard visual style.

Cards:

Today's Appointments
Pending
Confirmed
Completed

Optionally add:

New Patients
Returning Patients

Recent Appointments table should show:

Patient
Patient ID
Date & Time
Issue
Status
Quick Action

Clicking patient name should open Patient Profile.

---

# 26. PATIENT INFORMATION SIDEBAR PAGE

The existing:

Patient Information

menu should become a proper patient directory.

Columns:

Patient ID
Patient Name
Phone
Age
Gender
Last Visit
Total Visits
Actions

Actions:

View History
Book Appointment
Prescription

Search:

Name
Patient ID
Phone

---

# 27. NEW VS RETURNING PATIENT

Clearly label:

NEW PATIENT

when no previous completed visit exists.

For existing patients show:

RETURNING PATIENT

and optionally:

Last Visit: [date]

This should be visible during appointment review.

---

# 28. DUPLICATE PREVENTION

Before creating a patient:

normalize phone number
normalize email
normalize whitespace/case in names

Check existing records.

Never merge solely because two people share a name.

If a strong match exists:

"Existing patient found."

If ambiguous:

"Possible matches found."

Let authorized staff choose.

Create a new patient only when appropriate.

---

# 29. DATABASE DESIGN

Adapt this to the project's existing database technology.

Do NOT blindly replace the existing schema.

Conceptually we need entities similar to:

patients

id
patient_uid
name
dob
age if needed
gender
phone
email
address
created_at
updated_at

appointments

id
appointment_uid
patient_id
appointment_date
appointment_time
issue
status
rejection_reason
created_at
updated_at

visits

id
visit_uid
patient_id
appointment_id
doctor_id
visit_date
chief_complaint
symptoms
diagnosis
clinical_notes
advice
follow_up_date
created_at

prescriptions

id
prescription_uid
patient_id
visit_id
doctor_id
created_at

prescription_items

id
prescription_id
medicine_id or medicine_name
strength
dose
frequency
duration
route
instructions

medicine_master

id
name
generic_name
brand_name
active

audit_log if appropriate

id
user_id
action
entity_type
entity_id
timestamp

Use foreign keys and indexes appropriately.

patient_id should connect all patient-related history.

---

# 30. DATA MIGRATION

This project already has appointments.

DO NOT break or delete existing data.

Create a migration strategy.

For existing appointment records:

attempt to link records to patients using safe identifiers.

Do not automatically merge ambiguous patients.

Preserve existing appointment IDs where possible.

Create Patient IDs for migrated patient records.

Back up / make migration reversible according to the existing stack.

---

# 31. UI DESIGN

Preserve the existing admin design language visible in the current project:

dark navy sidebar
white/light content canvas
blue primary action
soft rounded cards
subtle borders
minimal shadows
clean typography
compact hospital admin layout

Do NOT redesign the whole admin panel into a completely different product.

Improve clarity and functionality.

Action buttons must have adequate contrast and readable labels.

Use consistent icons from the project's existing icon library.

---

# 32. APPOINTMENT ROW EXAMPLE

The redesigned row should conceptually read:

#APT-2026-00004

Navnath Jangale
Patient ID: VH-2026-00035
7720991375

22 Aug 2026
14:00

Issue:
[existing issue]

Last Visit:
21 Aug 2026

Status:
PENDING

Actions:

View
Approve
Reject
Medical
More ▾

Inside More:

Edit
Mark Pending
Delete / Archive

Exact arrangement can adapt responsively.

---

# 33. PATIENT DETAIL EXAMPLE

Patient:

Navnath Jangale

Patient ID:
VH-2026-00035

Phone:
7720991375

SUMMARY

Total Visits: 4
First Visit: [date]
Last Visit: [date]
Last Prescription: [date]

TABS:

Overview
Visit History
Appointments
Prescriptions
Medicines
Clinical Notes

VISIT HISTORY

22 Aug 2026
Issue: [...]
Diagnosis: [...]
Medicines: [...]
Doctor: [...]
Status: [...]

21 Aug 2026
Issue: [...]
Diagnosis: [...]
Medicines: [...]
Doctor: [...]

etc.

---

# 34. PERMISSIONS & PRIVACY

This application contains sensitive patient information.

Respect the existing authentication system.

At minimum structure permissions so the application can distinguish authorized roles where possible:

Admin
Doctor
Reception / Staff

Examples:

Reception:
appointment management and limited demographic access

Doctor:
clinical history and prescriptions

Admin:
configuration and authorized administrative actions

Do not expose patient records publicly.

Do not expose sensitive patient information in URLs, logs, browser console, or client-side debug output unnecessarily.

Do not send complete patient records to screens/components that do not require them.

Use server-side authorization where applicable.

---

# 35. AUDITABILITY

For important actions, preserve audit information where practical:

appointment status changed
prescription created
prescription edited
patient details edited
record archived/deleted
email prescription sent

Store:

who
what
when

Clinical records should not silently change without trace where the architecture supports audit logging.

---

# 36. RESPONSIVE DESIGN

The admin panel must work on:

Desktop
Tablet
Mobile

Desktop:
full sidebar + tables.

Tablet:
compact sidebar.

Mobile:
drawer navigation and cards instead of unusable wide tables.

Important actions must remain accessible.

---

# 37. EMPTY / LOADING / ERROR STATES

Create proper states for:

No patients found
No appointment history
No prescriptions
No previous medicines
Loading patient
Failed to load
Email failed
PDF generation failed
Duplicate patient warning

Do not leave blank areas.

---

# 38. PERFORMANCE

Patient search should remain fast as records grow.

Use:

indexed Patient ID
indexed normalized phone
indexed appointment ID
appropriate database search strategy
pagination
debounced search where useful

Do not load the entire patient database into the browser.

---

# 39. IMPLEMENTATION ORDER

Do this systematically.

PHASE 1
Inspect existing project and understand architecture.

PHASE 2
Design patient-centered data model and safe migration.

PHASE 3
Implement unique Patient ID / UHID.

PHASE 4
Implement duplicate detection and returning-patient linking.

PHASE 5
Build Patient Directory and global patient search.

PHASE 6
Build Patient Profile and complete history timeline.

PHASE 7
Upgrade Appointments page and action buttons.

PHASE 8
Implement visits/consultations.

PHASE 9
Implement prescriptions and medicine history.

PHASE 10
Implement print + PDF.

PHASE 11
Implement email prescription using the project's existing email/backend infrastructure or an appropriate server-side integration.

PHASE 12
Add permissions, validation and audit behavior.

PHASE 13
Test existing and new workflows.

---

# 40. TEST THESE SCENARIOS

Before considering the work complete, test:

TEST 1:
New patient books first appointment.
→ Patient ID generated.

TEST 2:
Same patient books using Patient ID.
→ Existing patient found.
→ New appointment linked.

TEST 3:
Same patient books using same phone.
→ Existing patient detected.

TEST 4:
Two different patients have same name.
→ They are NOT automatically merged.

TEST 5:
Search Patient ID.
→ Complete correct patient profile opens.

TEST 6:
Search patient name.
→ Relevant matching patients appear.

TEST 7:
Open returning patient's appointment.
→ Previous visits are visible.

TEST 8:
Doctor creates prescription.
→ Prescription is stored against correct visit/patient.

TEST 9:
Patient returns later.
→ Previous medicines and prescriptions remain visible.

TEST 10:
Print prescription.
→ Clean A4 output.

TEST 11:
Download PDF.
→ Correct patient/prescription information.

TEST 12:
Email prescription.
→ Correct PDF is sent to correct email after confirmation.

TEST 13:
Reject appointment.
→ Appointment remains in history with Rejected status.

TEST 14:
Delete/archive appointment.
→ Confirmation required and clinical history is not accidentally destroyed.

TEST 15:
Existing appointments from the old system.
→ Existing data remains intact after migration.

---

# 41. CRITICAL RULES

DO NOT:
- rebuild the entire project unnecessarily
- create duplicate patients for every appointment
- identify patients by name alone
- silently merge ambiguous patient records
- overwrite old prescriptions
- overwrite old visits
- permanently destroy medical history when deleting an appointment
- fabricate medicines
- fabricate diagnoses
- automatically prescribe medicines
- expose sensitive patient data publicly
- make action buttons unclear
- break existing appointments
- break existing routes
- break existing UI unnecessarily

DO:
- preserve existing code where appropriate
- reuse existing components
- use existing design tokens
- maintain backward compatibility
- implement proper database relationships
- use safe migrations
- validate all forms
- show clear success/error feedback
- preserve complete patient history
- keep UI simple for hospital staff

FINAL GOAL:

When an authorized staff member searches a patient using:

NAME
PATIENT ID / UHID
PHONE
EMAIL
APPOINTMENT ID

they should quickly find the correct patient and see their complete longitudinal record:

Appointments
Visit dates
Complaints
Diagnosis
Clinical notes
Previous medicines
Prescriptions
Follow-ups

The staff should then be able to:

Book another appointment
View history
Update appointment status
Create a new consultation
Create prescription
Print prescription
Download prescription PDF
Email prescription

without creating duplicate patient records.

Before modifying code, inspect the current implementation and produce a short implementation plan. Then implement this incrementally without breaking existing functionality.