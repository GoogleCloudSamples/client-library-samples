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

// [START tpu_v1_tpu_tensorflowversions_list]

import (
	"context"
	"fmt"
	"io"

	tpu "cloud.google.com/go/tpu/apiv1"
	tpupb "cloud.google.com/go/tpu/apiv1/tpupb"
	"google.golang.org/api/iterator"
)

// listTensorFlowVersions lists available TensorFlow versions in a location.
func listTensorFlowVersions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := tpu.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("tpu.NewClient: %w", err)
	}
	defer client.Close()

	req := &tpupb.ListTensorFlowVersionsRequest{
		Parent: parent,
	}

	it := client.ListTensorFlowVersions(ctx, req)
	for {
		version, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "- %s: %s\n", version.GetName(), version.GetVersion())
	}

	return nil
}

// [END tpu_v1_tpu_tensorflowversions_list]
