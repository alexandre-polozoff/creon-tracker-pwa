# Version 1.2.2 Update - Meal Type Selection

## 🎉 New Feature Added

### Meal Type Radio Buttons

Users can now select the type of meal when logging Creon doses!

## What's New

### Visual Selection
When logging a Creon dose, users now see four beautiful radio buttons:
- 🌅 **Breakfast**
- ☀️ **Lunch**
- 🌙 **Dinner**
- 🍎 **Snack**

### How It Works

1. **User Interface:**
   - Radio buttons appear before the meal description field
   - Displayed in a 2x2 grid layout
   - Each button has an emoji icon for quick recognition
   - Selected button highlights in purple with white text
   - Smooth animations and hover effects

2. **Validation:**
   - Required field (must select one)
   - Error message if not selected
   - Clear visual feedback on selection

3. **Data Storage:**
   - Meal type saved with each Creon entry
   - Stored as: "Breakfast", "Lunch", "Dinner", or "Snack"
   - Backward compatible with old entries (shows "Not specified")

4. **Display:**
   - History view shows meal type as first detail
   - Example: "Meal Type: Breakfast"
   - Old entries show "Not specified"

5. **Export:**
   - CSV export includes new "Meal Type" column
   - Data appears between Time and Doses columns
   - Full export format: `Type,Date,Time,Meal Type,Doses,Meal,Symptoms...`

## User Benefits

### Better Tracking
- Quickly identify which meal the dose was for
- Pattern recognition (e.g., "I always need more for dinner")
- Doctor can see dose distribution across meals

### Easier Logging
- One-tap selection (no typing)
- Visual icons speed up recognition
- Less thinking required

### Better Analysis
- Export to Excel and analyze by meal type
- See if certain meals require more doses
- Track symptom patterns by meal time

## Technical Details

### CSS Styling
```css
.meal-type-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.meal-type-radio input:checked + .meal-type-label {
    border-color: #667eea;
    background: #667eea;
    color: white;
    transform: scale(1.05);
}
```

### Data Structure
```javascript
{
  id: "creon:2026-02-09T...",
  type: "creon",
  doses: 2,
  time: "12:30",
  mealType: "Lunch",  // NEW FIELD
  meal: "Pasta with meat sauce",
  symptoms: "",
  date: "2/9/2026",
  timestamp: "2026-02-09T..."
}
```

### Form HTML
```html
<div class="form-group">
    <label class="required">Meal Type</label>
    <div class="meal-type-options">
        <label class="meal-type-radio">
            <input type="radio" name="mealType" value="Breakfast" required>
            <span class="meal-type-label">🌅 Breakfast</span>
        </label>
        <!-- ... other options ... -->
    </div>
</div>
```

## Backward Compatibility

### Old Entries
- Entries created before v1.2.2 don't have `mealType` field
- Display shows: "Meal Type: Not specified"
- No data migration needed
- All functionality preserved

### Export Compatibility
- CSV includes new column
- Old entries show empty meal type column
- Excel users can filter/sort by meal type
- Data analysis unaffected

## Version Changes

### Updated Files
- **HTML:** v1.2.2
- **Settings Display:** "1.2.2 Enhanced"
- **Features List:** Added "Meal type selection"
- **Backup Metadata:** version: "1.2.2"

### What Changed
- Added meal type radio button group
- Added CSS styling for radio buttons
- Updated validation to check meal type
- Modified save function to store meal type
- Updated display to show meal type
- Enhanced CSV export with meal type column

## Migration Guide

### For New Users
Just use the app normally - select meal type when logging!

### For Existing Users
1. Update to v1.2.2
2. Old entries still visible and functional
3. New entries require meal type selection
4. Export includes both old and new entries

### No Action Needed
- No data migration required
- No manual updates needed
- Seamless transition

## Testing Checklist

- [x] Meal type radio buttons display correctly
- [x] Can select each meal type (Breakfast, Lunch, Dinner, Snack)
- [x] Selected button highlights in purple
- [x] Validation prevents submission without selection
- [x] Error message appears if not selected
- [x] Meal type saves with entry
- [x] History displays meal type
- [x] Old entries show "Not specified"
- [x] CSV export includes meal type column
- [x] Backup/restore preserves meal type
- [x] Mobile responsive (2x2 grid)
- [x] Keyboard accessible
- [x] Screen reader compatible

## Screenshots Reference

### Form View
```
┌─────────────────────────────────┐
│ Meal Type *                     │
├─────────────┬───────────────────┤
│ 🌅 Breakfast│ ☀️ Lunch          │
├─────────────┼───────────────────┤
│ 🌙 Dinner   │ 🍎 Snack          │
└─────────────┴───────────────────┘
```

### Selected State
```
┌─────────────────────────────────┐
│ Meal Type *                     │
├─────────────┬───────────────────┤
│ 🌅 Breakfast│ [☀️ Lunch]       │ ← Selected (purple)
├─────────────┼───────────────────┤
│ 🌙 Dinner   │ 🍎 Snack          │
└─────────────┴───────────────────┘
```

### History Display
```
┌─────────────────────────────────┐
│ 💊 Creon                        │
│ 2/9/2026          12:30 PM      │
├─────────────────────────────────┤
│ Meal Type                       │
│ Lunch                          │
├─────────────────────────────────┤
│ Doses                          │
│ 2 capsules                     │
├─────────────────────────────────┤
│ Meal                           │
│ Pasta with meat sauce          │
└─────────────────────────────────┘
```

## CSV Export Format

### New Format (v1.2.2)
```
Type,Date,Time,Meal Type,Doses,Meal,Symptoms,Stool Quality,Stool Properties,Stool Notes
Creon,"2/9/2026","12:30","Lunch","2","Pasta","","","",""
Creon,"2/9/2026","18:00","Dinner","3","Steak","Bloating","","",""
```

### Old Format (v1.2.1 and earlier)
```
Type,Date,Time,Doses,Meal,Symptoms,Stool Quality,Stool Properties,Stool Notes
Creon,"2/9/2026","12:30","2","Pasta","","","",""
```

## Accessibility

### Keyboard Navigation
- Tab to meal type radio group
- Arrow keys to select between options
- Space/Enter to confirm selection
- Visual focus indicator on active button

### Screen Reader
- Announces: "Meal Type, required, radio group"
- Each option: "Breakfast, radio button, not checked"
- When selected: "Lunch, radio button, checked"
- Error: "Please select a meal type"

### ARIA Labels
```html
<div role="radiogroup" aria-label="Meal Type">
  <input type="radio" ... aria-checked="false">
</div>
```

## Benefits for Doctors/Healthcare Providers

### Pattern Analysis
- See dose requirements by meal type
- Identify meals that need higher doses
- Track symptom correlation with meal types
- Optimize dosing schedule

### Example Analysis in Excel
```
PivotTable: Average Doses by Meal Type
Breakfast: 1.8 capsules
Lunch:     2.3 capsules
Dinner:    2.7 capsules
Snack:     1.2 capsules
```

### Clinical Insights
- Patient may need more enzymes at dinner
- Snacks consistently require fewer doses
- Pattern matches meal size expectations

## Future Enhancements

### Potential Additions
- Custom meal types (user-defined)
- Meal time suggestions based on meal type
- Automatic dose recommendations by meal type
- Visual charts showing doses by meal type
- Weekly meal type summary

### Analytics
- Track most common meal type logged
- Average doses per meal type
- Symptom frequency by meal type
- Trends over time

## Summary

### What Users Get
✅ Quick meal type selection
✅ Better organized data
✅ More detailed exports
✅ Pattern recognition capability
✅ Professional tracking

### What Didn't Change
✅ All existing features work
✅ Old data preserved
✅ Same workflow
✅ Same privacy guarantees
✅ Same offline capability

## Deployment Notes

### Service Worker
- Consider updating to v1.2.2 for cache consistency
- Current version still compatible
- No forced update required

### Rollout Strategy
1. Deploy HTML update
2. Users see new field immediately
3. No interruption to existing workflows
4. Gradual adoption as users log new entries

---

**Version:** 1.2.2 Enhanced
**Release Date:** February 9, 2026
**Type:** Feature Addition
**Breaking Changes:** None
**Data Migration:** Not Required

🎉 **Enjoy the new meal type tracking feature!**
