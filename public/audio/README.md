# Audio Files for The Shipping Bible

This directory contains audio files for each section of The Shipping Bible playbook.

## File Naming Convention

Audio files should be named according to their corresponding section in the playbook:

### Required Audio Files

1. **philosophy.mp3** - Our Philosophy section
2. **phase-1-spark.mp3** - Phase 1: The Spark
3. **phase-2-build.mp3** - Phase 2: The Build
4. **phase-3-polish.mp3** - Phase 3: The Polish
5. **phase-3-5-prelaunch.mp3** - Phase 3.5: The Pre-Launch
6. **phase-4-content.mp3** - Phase 4: The Content
7. **phase-5-launch.mp3** - Phase 5: The Launch
8. **phase-6-followup.mp3** - Phase 6: The Follow-Up
9. **launch-checklist.mp3** - Quick Reference: Launch Checklist
10. **principles.mp3** - The Crafter Station Principles

## File Format Requirements

- **Format:** MP3 (recommended for best browser compatibility)
- **Quality:** 128-192 kbps is sufficient for voice narration
- **Sample Rate:** 44.1 kHz
- **Channels:** Mono (for voice) or Stereo

## Alternative Formats

You can also use other audio formats supported by HTML5:
- `.ogg` - Ogg Vorbis
- `.wav` - Waveform Audio
- `.m4a` - MPEG-4 Audio
- `.aac` - Advanced Audio Coding

If using alternative formats, update the `type` attribute in the [AudioPlayer component](../../src/components/AudioPlayer.astro).

## Recording Tips

1. Use a quiet environment to minimize background noise
2. Speak clearly and at a moderate pace
3. Keep energy consistent throughout the recording
4. Edit out long pauses and filler words
5. Normalize audio levels for consistency across all files

## Adding New Sections

If you add a new section to the playbook:

1. Record the audio following the naming convention
2. Place the file in this directory
3. Add the AudioPlayer component in the [playbook.mdx](../../src/content/playbook.mdx) file:
   ```mdx
   <AudioPlayer src="/audio/your-file-name.mp3" title="Listen to Your Section Title" />
   ```

## Placeholder Files

Until you record the actual audio, the audio players will show an error message. This is normal and won't break the site.
