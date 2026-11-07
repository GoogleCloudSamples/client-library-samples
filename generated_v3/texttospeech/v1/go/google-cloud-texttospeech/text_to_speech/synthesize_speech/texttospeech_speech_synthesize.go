// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START texttospeech_v1_texttospeech_synthesize_speech]

import (
	"context"
	"fmt"
	"io"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	texttospeechpb "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
)

// synthesizeSpeech demonstrates calling the SynthesizeSpeech method to convert text to speech audio.
func synthesizeSpeech(ctx context.Context, w io.Writer) error {
	client, err := texttospeech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	input := &texttospeechpb.SynthesisInput{
		InputSource: &texttospeechpb.SynthesisInput_Text{
			Text: "Hello, world!",
		},
	}
	audioConfig := &texttospeechpb.AudioConfig{
		AudioEncoding: texttospeechpb.AudioEncoding_MP3,
	}
	voice := &texttospeechpb.VoiceSelectionParams{
		LanguageCode: "en-US",
		SsmlGender:   texttospeechpb.SsmlVoiceGender_FEMALE,
	}

	req := &texttospeechpb.SynthesizeSpeechRequest{
		Input:       input,
		Voice:       voice,
		AudioConfig: audioConfig,
	}

	resp, err := client.SynthesizeSpeech(ctx, req)
	if err != nil {
		return fmt.Errorf("SynthesizeSpeech: %w", err)
	}

	fmt.Fprintf(w, "Audio content size: %d bytes\n", len(resp.GetAudioContent()))
	return nil
}

// [END texttospeech_v1_texttospeech_synthesize_speech]
