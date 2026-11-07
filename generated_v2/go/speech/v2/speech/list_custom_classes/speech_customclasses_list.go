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

// [START speech_v2_speech_customclasses_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listCustomClasses lists speech custom classes in a project and location.
func listCustomClasses(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	var opts []option.ClientOption
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.ListCustomClassesRequest{
		Parent: parent,
	}

	it := client.ListCustomClasses(ctx, req)
	for {
		customClass, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListCustomClasses iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Custom class name: %s\n", customClass.GetName())
	}

	return nil
}

// [END speech_v2_speech_customclasses_list]
