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

// [START texttospeech_v1_texttospeech_voices_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	texttospeechpb "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
	"google.golang.org/api/option"
)

// listVoices retrieves and prints the available Text-to-Speech voices.
func listVoices(ctx context.Context, w io.Writer) error {
	var opts []option.ClientOption
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := texttospeech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &texttospeechpb.ListVoicesRequest{}

	resp, err := client.ListVoices(ctx, req)
	if err != nil {
		return fmt.Errorf("ListVoices: %w", err)
	}

	for _, voice := range resp.GetVoices() {
		fmt.Fprintf(w, "Name: %s\n", voice.GetName())
		for _, lang := range voice.GetLanguageCodes() {
			fmt.Fprintf(w, "  Supported language: %s\n", lang)
		}
		fmt.Fprintf(w, "  SSML voice gender: %s\n", voice.GetSsmlGender())
		fmt.Fprintf(w, "  Natural sample rate Hertz: %d\n", voice.GetNaturalSampleRateHertz())
	}

	return nil
}

// [END texttospeech_v1_texttospeech_voices_list]
