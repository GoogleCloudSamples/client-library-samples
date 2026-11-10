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

// [START speech_v2_speech_undelete_phrase_set]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/api/option"
)

// undeletePhraseSet restores a previously deleted phrase set.
func undeletePhraseSet(ctx context.Context, w io.Writer, projectID string, locationID string, phraseSetID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/phraseSets/%s", projectID, locationID, phraseSetID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.UndeletePhraseSetRequest{
		Name: name,
	}

	op, err := client.UndeletePhraseSet(ctx, req)
	if err != nil {
		return fmt.Errorf("UndeletePhraseSet failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Undeleted phrase set: %s\n", resp.GetName())
	return nil
}

// [END speech_v2_speech_undelete_phrase_set]
